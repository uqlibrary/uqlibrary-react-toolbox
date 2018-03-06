import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearFileUpload} from '../actions';

import Checkbox from 'material-ui/Checkbox';
import FileUploadDropzone from './FileUploadDropzone';
import FileUploadRowHeader from './FileUploadRowHeader';
import FileUploadRow from './FileUploadRow';

import {OPEN_ACCESS_ID} from './FileUploadAccessSelector';

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
        fileRestrictionsConfig: PropTypes.object,
        requireOpenAccessStatus: PropTypes.bool,
        clearFileUpload: PropTypes.func,
        disabled: PropTypes.bool,
        defaultQuickTemplateId: PropTypes.number
    };

    static defaultProps = {
        overallProgress: 0,
        locale: {
            instructions: 'You may add up to [fileUploadLimit] files (max [maxFileSize][fileSizeUnit] each)',
            accessTermsAndConditions: 'I understand that the files indicated above as open access will be submitted as open access and will be made publicly available immediately or will be made available on the indicated embargo date.  All other files submitted will be accessible by UQ eSpace administrators.',
            validation: {
                ['folder']: 'Invalid files ([filenames])',
                ['fileName']: 'File(s) ([filenames]) have invalid file name',
                ['maxFileSize']: 'File(s) ([filenames]) exceed maximum allowed upload file size',
                ['maxFiles']: 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) ([filenames]) will not be uploaded',
            },
            errorTitle: 'Upload Errors',
            successTitle: 'Success',
            successMessage: 'Successfully added [numberOfFiles] file(s) to upload queue.',
            fileUploadRestrictionHeading: (<h3>File upload restrictions</h3>),
            fileUploadRestrictions: (
                <div>
                    Please ensure your files:
                    <ul>
                        <li>begin with a letter and are less than 45 characters long</li>
                        <li>contain only upper and lowercase alphanumeric characters, and underscores</li>
                        <li>have only a single period which precedes the file extension: “.pdf”</li>
                        <li>are uploaded individually and not inside a folder</li>
                    </ul>
                </div>
            ),
            fileUploadInstruction: (
                <p>Click here to select files, or drag files into this area to upload</p>
            )
        },
        fileRestrictionsConfig: {
            fileUploadLimit: 10,
            maxFileSize: 5,
            fileSizeUnit: 'G'
        },
        requireOpenAccessStatus: false
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
        if (this.props.onChange) this.props.onChange({queue: nextState.uploadedFiles, isValid: this.isFileUploadValid(nextState)});
    }

    componentWillUnmount() {
        this.props.clearFileUpload();
    }

    /**
     * Delete file on a given index
     *
     * @param file
     * @param index
     * @private
     */
    _deleteFile = (file, index) => {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter((_, i) => i !== index),
            clearErrors: true
        });
    };

    /**
     * Replace file on a given index
     *
     * @param file
     * @param index
     * @private
     */
    _replaceFile = (file, index) => {
        this.setState({
            uploadedFiles: [
                ...this.state.uploadedFiles.slice(0, index),
                file,
                ...this.state.uploadedFiles.slice(index + 1)
            ],
            clearErrors: true
        });
    };

    /**
     * Delete all files
     *
     * @private
     */
    _deleteAllFiles = () => {
        this.setState({uploadedFiles: [], clearErrors: true});
    };

    /**
     * Set uploaded files
     *
     * @param files
     * @private
     */
    _setUploadedFiles = (files) => {
        if (!!this.props.defaultQuickTemplateId && !this.props.requireOpenAccessStatus) {
            files.map((file) => (file.access_condition_id = this.props.defaultQuickTemplateId));
        }
        this.setState({uploadedFiles: [...files], clearErrors: false, focusOnIndex: (files.length + this.state.uploadedFiles.length) - files.length});
    };

    /**
     * Accept terms and conditions
     *
     * @param event
     * @param value
     * @private
     */
    _acceptTermsAndConditions = (event, value) => {
        this.setState({termsAndConditions: value});
    };

    /**
     * Calculate max file size allowed by dropzone
     *
     * @returns {number}
     */
    calculateMaxFileSize = () => {
        const {maxFileSize, fileSizeUnit} = this.props.fileRestrictionsConfig;
        return maxFileSize * Math.pow(sizeBase, sizeExponent[fileSizeUnit] || 0);
    };

    /**
     * Check if file is open access
     *
     * @param file
     * @returns {boolean}
     */
    isOpenAccess = (file) => {
        return this.hasAccess(file) && file.access_condition_id === OPEN_ACCESS_ID;
    };

    /**
     * Check if any file is open access
     *
     * @param files
     * @returns {boolean}
     */
    isAnyOpenAccess = (files) => {
        return files.filter((file) => (this.isOpenAccess(file))).length > 0;
    };

    /**
     * Check if file as access conditions field
     *
     * @param file
     * @returns {boolean}
     */
    hasAccess = (file) => {
        return file.hasOwnProperty('access_condition_id');
    };

    /**
     * Check if file has embargo date field
     *
     * @param file
     * @returns {boolean}
     */
    hasEmbargoDate = (file) => {
        return file.hasOwnProperty('date') && (file.date !== null || file.date !== undefined);
    };

    /**
     * Check if entire file uploader is valid including access conditions, embargo date and t&c
     *
     * @param uploadedFiles
     * @param termsAndConditions
     * @returns {boolean}
     */
    isFileUploadValid = ({uploadedFiles, termsAndConditions}) => {
        let isValid = true;

        if (this.props.requireOpenAccessStatus) {
            if (uploadedFiles.filter((file) => (!this.hasAccess(file))).length > 0) {
                isValid = false;
            }

            if (uploadedFiles
                .filter((file) => (this.isOpenAccess(file)))
                .filter((file) => (!(this.hasEmbargoDate(file) && termsAndConditions)))
                .length > 0) {
                isValid = false;
            }
        }

        return isValid;
    };

    render() {
        const {instructions, accessTermsAndConditions} = this.props.locale;
        const {maxFileSize, fileSizeUnit, fileUploadLimit, fileNameRestrictions} = this.props.fileRestrictionsConfig;
        const {requireOpenAccessStatus} = this.props;
        const {uploadedFiles, clearErrors, termsAndConditions} = this.state;

        const instructionsDisplay = instructions
            .replace('[fileUploadLimit]', fileUploadLimit)
            .replace('[maxFileSize]', `${maxFileSize}`)
            .replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

        const uploadedFilesRow = this.state.uploadedFiles.map((file, index) => {
            return (
                <FileUploadRow
                    key={file.name}
                    index={index}
                    uploadedFile={file}
                    fileSizeUnit={fileSizeUnit}
                    onDelete={this._deleteFile}
                    onAttributeChanged={this._replaceFile}
                    requireOpenAccessStatus={requireOpenAccessStatus && !this.props.defaultQuickTemplateId}
                    disabled={this.props.disabled}
                    focusOnIndex={this.state.focusOnIndex}
                />
            );
        });

        return (
            <div>
                <h4 className="sub-title">{instructionsDisplay}</h4>
                <FileUploadDropzone
                    locale={this.props.locale}
                    maxSize={this.calculateMaxFileSize()}
                    maxFiles={fileUploadLimit}
                    fileNameRestrictions={fileNameRestrictions}
                    disabled={this.props.disabled}
                    onDropped={this._setUploadedFiles}
                    uploadedFiles={uploadedFiles}
                    clearErrors={clearErrors} />
                <div
                    className="metadata-container"
                    style={uploadedFilesRow.length === 0 ? ({display: 'none'}) : ({display: 'block'})}>
                    {
                        uploadedFiles.length > 0 &&
                        <FileUploadRowHeader
                            onDeleteAll={this._deleteAllFiles}
                            requireOpenAccessStatus={requireOpenAccessStatus && !this.props.defaultQuickTemplateId}
                            disabled={this.props.disabled} />
                    }

                    {uploadedFilesRow}

                    {
                        requireOpenAccessStatus && this.isAnyOpenAccess(uploadedFiles) &&
                        <div style={{position: 'relative', width: '100%'}} className={!termsAndConditions ? 'open-access-checkbox error-checkbox' : 'open-access-checkbox'}>
                            <Checkbox label={accessTermsAndConditions} onCheck={this._acceptTermsAndConditions} checked={termsAndConditions} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearFileUpload: () => (dispatch(clearFileUpload()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
