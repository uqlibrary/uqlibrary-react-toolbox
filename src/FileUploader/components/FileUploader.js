import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { clearFileUpload } from '../actions';

import LinearProgress from 'material-ui/LinearProgress';
import Checkbox from 'material-ui/Checkbox';
import FileUploadDropzone from './FileUploadDropzone';
import FileUploadRowHeader from './FileUploadRowHeader';
import FileUploadRow from './FileUploadRow';

import { OPEN_ACCESS_ID } from './FileUploadAccessSelector';

export const sizeExponent = {
    ['B']: 0,
    ['K']: 1,
    ['M']: 2,
    ['G']: 3
};

export const sizeUnitText = {
    ['B']: 'B',
    ['K']: 'KB',
    ['M']: 'MB',
    ['G']: 'GB'
};

export const sizeBase = 1000;

export class FileUploader extends PureComponent {

    static propTypes = {
        onChange: PropTypes.func,
        locale: PropTypes.object,
        defaultConfig: PropTypes.object,
        overallProgress: PropTypes.number,
        requireFileAccess: PropTypes.bool,
        clearFileUpload: PropTypes.func
    };

    static defaultProps = {
        overallProgress: 0,
        locale: {
            instructions: 'You may add up to [fileUploadLimit] files (max [maxFileSize][fileSizeUnit] each)',
            accessTermsAndConditions: 'I understand that the files indicated above will be submitted as open access and will be made publically available immediately, or where indicated as closed access, will be made available on the indicated embargo date.'
        },
        defaultConfig: {
            fileUploadLimit: 10,
            maxFileSize: 5,
            fileSizeUnit: 'G'
        },
        requireFileAccess: false
    };

    constructor(props) {
        super(props);
        this.state = {
            uploadedFiles: [],
            clearErrors: false,
            termsAndConditions: false
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.onChange) this.props.onChange({queue: nextState.uploadedFiles, isValid: this._isFileUploadValid(nextState)});
    }

    componentWillUnmount() {
        this.props.clearFileUpload();
    }

    deleteFile = (file, index) => {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter((_, i) => i !== index),
            clearErrors: true
        });
    };

    replaceFile = (file, index) => {
        this.setState({
            uploadedFiles: [
                ...this.state.uploadedFiles.slice(0, index),
                file,
                ...this.state.uploadedFiles.slice(index + 1)
            ],
            clearErrors: true
        });
    };

    deleteAllFiles = () => {
        this.setState({ uploadedFiles: [], clearErrors: true });
    };

    setUploadedFiles = (files) => {
        this.setState({ uploadedFiles: [...files], clearErrors: false });
    };

    acceptTermsAndConditions = (event, value) => {
        this.setState({ termsAndConditions: value });
    };

    _calculateMaxFileSize = () => {
        const { maxFileSize, fileSizeUnit } = this.props.defaultConfig;
        return maxFileSize * Math.pow(sizeBase, sizeExponent[fileSizeUnit] || 0);
    };

    _isOpenAccess = (file) => {
        return this._hasAccess(file) && file.access_condition_id === OPEN_ACCESS_ID;
    };

    _isAnyOpenAccess = (files) => {
        return files.filter((file) => (this._isOpenAccess(file))).length > 0;
    };

    _hasAccess = (file) => {
        return file.hasOwnProperty('access_condition_id');
    };

    _hasEmbargoDate = (file) => {
        return file.hasOwnProperty('date') && (file.date !== null || file.date !== undefined);
    };

    _isFileUploadValid = ({uploadedFiles, termsAndConditions}) => {
        let isValid = true;

        if (this.props.requireFileAccess) {
            if (uploadedFiles.filter((file) => (!this._hasAccess(file))).length > 0) isValid = false;

            if (uploadedFiles.filter((file) => (this._isOpenAccess(file)))
                    .filter((file) => (!(this._hasEmbargoDate(file) && termsAndConditions)))
                    .length > 0) isValid = false;
        }

        return isValid;
    };

    render() {
        const { instructions, accessTermsAndConditions } = this.props.locale;
        const { maxFileSize, fileSizeUnit, fileUploadLimit } = this.props.defaultConfig;
        const { requireFileAccess, overallProgress } = this.props;
        const { uploadedFiles, clearErrors, termsAndConditions } = this.state;

        const instructionsDisplay = instructions
            .replace('[fileUploadLimit]', fileUploadLimit)
            .replace('[maxFileSize]', `${maxFileSize}`)
            .replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

        const uploadedFilesRow = this.state.uploadedFiles.map((file, index) => {
            return (<FileUploadRow
                key={ file.name }
                index={ index }
                uploadedFile={ file }
                fileSizeUnit={ fileSizeUnit }
                onDelete={ this.deleteFile }
                onAttributeChanged={ this.replaceFile }
                requireFileAccess={ requireFileAccess } />);
        });

        return (
            <div>
                <h4 className="sub-title">{ instructionsDisplay }</h4>
                <FileUploadDropzone
                    maxSize={ this._calculateMaxFileSize() }
                    maxFiles={ fileUploadLimit }
                    onDropped={ this.setUploadedFiles }
                    uploadedFiles={ uploadedFiles }
                    clearErrors={ clearErrors } />

                {
                     uploadedFiles.length > 0 && (
                        <FileUploadRowHeader onDeleteAll={ this.deleteAllFiles } requireFileAccess={ requireFileAccess } />
                     )
                }

                { uploadedFilesRow }

                {
                    requireFileAccess && this._isAnyOpenAccess(uploadedFiles) &&
                        <Checkbox label={ accessTermsAndConditions } onCheck={ this.acceptTermsAndConditions } checked={ termsAndConditions } />
                }

                {
                    overallProgress > 0 &&
                    <LinearProgress
                        className="upload-overall"
                        mode="determinate"
                        value={ overallProgress }
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        overallProgress: state.get('fileUpload').overall || 0
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearFileUpload: () => (dispatch(clearFileUpload()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
