import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { clearFileUpload } from '../actions';

import LinearProgress from 'material-ui/LinearProgress';
import FileUploadDropzone from './FileUploadDropzone';
import FileUploadRowHeader from './FileUploadRowHeader';
import FileUploadRow from './FileUploadRow';

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
            clearErrors: false
        };
    }

    componentDidMount() {
        this.props.clearFileUpload();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.onChange)  this.props.onChange(nextState.uploadedFiles);
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

    _calculateMaxFileSize = () => {
        const { maxFileSize, fileSizeUnit } = this.props.defaultConfig;
        return maxFileSize * Math.pow(sizeBase, sizeExponent[fileSizeUnit] || 0);
    };

    render() {
        const { instructions } = this.props.locale;
        const { maxFileSize, fileSizeUnit, fileUploadLimit } = this.props.defaultConfig;
        const { requireFileAccess } = this.props;

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
                    uploadedFiles={ this.state.uploadedFiles }
                    clearErrors={ this.state.clearErrors } />

                {
                     this.state.uploadedFiles.length > 0 && (
                        <FileUploadRowHeader onDeleteAll={ this.deleteAllFiles } requireFileAccess={ requireFileAccess } />
                     )
                }

                { uploadedFilesRow }

                {
                    this.props.overallProgress > 0 &&
                    <LinearProgress
                        className="upload-overall"
                        mode="determinate"
                        value={ this.props.overallProgress }
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
