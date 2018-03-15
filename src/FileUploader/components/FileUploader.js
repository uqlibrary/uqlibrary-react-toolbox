import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearFileUpload} from '../actions';

import Checkbox from 'material-ui/Checkbox';
import FileUploadDropzone from './FileUploadDropzone';
import FileUploadRowHeader from './FileUploadRowHeader';
import FileUploadRow from './FileUploadRow';
import {Alert} from '../../Alert';

import {OPEN_ACCESS_ID} from './FileUploadAccessSelector';
import {FILE_META_KEY_EMBARGO_DATE, FILE_META_KEY_ACCESS_CONDITION} from './FileUploadRow';

const moment = require('moment');

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
            fileSizeUnit: 'G',
            fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
        },
        requireOpenAccessStatus: false
    };

    constructor(props) {
        super(props);
        this.state = {
            filesInQueue: [],
            isTermsAndConditionsAccepted: false,
            errorMessage: '',
            successMessage: ''
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.onChange) this.props.onChange({queue: nextState.filesInQueue, isValid: this.isFileUploadValid(nextState)});
    }

    componentWillUnmount() {
        this.props.clearFileUpload();
    }

    /*
     * File uploader's callback functions
     */

    /**
     * Delete file on a given index
     *
     * @param file
     * @param index
     * @private
     */
    _deleteFile = (file, index) => {
        const filesInQueue = [
            ...this.state.filesInQueue.slice(0, index),
            ...this.state.filesInQueue.slice(index + 1)
        ];

        this.setState({
            filesInQueue: filesInQueue,
            errorMessage: '',
            isTermsAndConditionsAccepted: this.state.isTermsAndConditionsAccepted && this.isAnyOpenAccess(filesInQueue)
        });
    };

    /**
     * Delete all files
     *
     * @private
     */
    _deleteAllFiles = () => {
        this.setState({filesInQueue: [], errorMessage: '', isTermsAndConditionsAccepted: false});
    };

    /**
     * Update file's access condition and/or embargo date based on selected value
     *
     * @param fileToUpdate
     * @param index
     * @param newValue
     * @private
     */
    _updateFileAccessCondition = (fileToUpdate, index, newValue) => {
        const file = {...fileToUpdate};

        file[FILE_META_KEY_ACCESS_CONDITION] = newValue;

        if (!this.isOpenAccess(newValue) && file.hasOwnProperty(FILE_META_KEY_EMBARGO_DATE)) {
            delete file[FILE_META_KEY_EMBARGO_DATE];
        }

        if (this.isOpenAccess(newValue) && !file.hasOwnProperty(FILE_META_KEY_EMBARGO_DATE)) {
            file[FILE_META_KEY_EMBARGO_DATE] = moment().format();
        }

        this.replaceFile(file, index);
    };

    /**
     * Update file's embargo date
     *
     * @param fileToUpdate
     * @param index
     * @param newValue
     * @private
     */
    _updateFileEmbargoDate = (fileToUpdate, index, newValue) => {
        const file = {...fileToUpdate};

        file[FILE_META_KEY_EMBARGO_DATE] = moment(newValue).format();

        this.replaceFile(file, index);
    };

    /**
     * Accept terms and conditions
     *
     * @param event
     * @param value
     * @private
     */
    _acceptTermsAndConditions = (event, value) => {
        this.setState({isTermsAndConditionsAccepted: value});
    };

    /**
     * Handle accepted, rejected and dropped folders and display proper alerts
     *
     * @param accepted
     * @param errorsFromDropzone
     */
    _handleDroppedFiles = (accepted, errorsFromDropzone) => {
        const errors = {...errorsFromDropzone};
        /*
         * Remove duplicate files from accepted which are already in queue
         */
        const uniqueFilesToQueue = this.removeDuplicate(accepted);

        /*
         * If max files uploaded, send max files and set error for ignored files
         */
        const {fileUploadLimit} = this.props.fileRestrictionsConfig;

        if (uniqueFilesToQueue.size > fileUploadLimit) {
            // Set error for files which won't be uploaded
            errors.maxFiles = [...uniqueFilesToQueue].slice(fileUploadLimit).map(file => file.name);

            this.queueFiles([...uniqueFilesToQueue].slice(0, fileUploadLimit));
        } else {
            this.queueFiles([...uniqueFilesToQueue]);
        }

        /*
         * Process any errors
         */
        this.processErrors(errors);
    };

    /*
     * File uploader's internal functions
     */

    /**
     * Replace file on a given index
     *
     * @param file
     * @param index
     * @private
     */
    replaceFile = (file, index) => {
        const filesInQueue = [
            ...this.state.filesInQueue.slice(0, index),
            file,
            ...this.state.filesInQueue.slice(index + 1)
        ];

        this.setState({
            filesInQueue: filesInQueue,
            errorMessage: '',
            isTermsAndConditionsAccepted: this.state.isTermsAndConditionsAccepted && this.isAnyOpenAccess(filesInQueue)
        });
    };

    /**
     * Set uploaded files
     *
     * @param files
     * @private
     */
    queueFiles = (files) => {
        this.setState({
            filesInQueue: this.props.defaultQuickTemplateId ? this.setDefaultAccessConditionId(files) : [...files].map(file => this.composeCustomFileObjectToUpload(file)),
            focusOnIndex: this.state.filesInQueue.length,
            errorMessage: ''
        });
    };

    /**
     * Tran
     * @param file
     */
    composeCustomFileObjectToUpload = (file) => ({fileData: file, name: file.name, size: file.size});

    /**
     * Set default access condition if defaultQuickTemplateId is provided
     *
     * @param files
     */
    setDefaultAccessConditionId = (files) => {
        return [...files].map(file => ({
            ...this.composeCustomFileObjectToUpload(file),
            [FILE_META_KEY_ACCESS_CONDITION]: this.props.defaultQuickTemplateId
        }));
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
     * @param value
     * @returns {boolean}
     */
    isOpenAccess = (value) => {
        return value === OPEN_ACCESS_ID;
    };

    /**
     * Check if any file is open access
     *
     * @param files
     * @returns {boolean}
     */
    isAnyOpenAccess = (files) => {
        return files.filter((file) => (this.hasAccess(file) && this.isOpenAccess(file[FILE_META_KEY_ACCESS_CONDITION]))).length > 0;
    };

    /**
     * Check if file as access conditions field
     *
     * @param file
     * @returns {boolean}
     */
    hasAccess = (file) => {
        return file.hasOwnProperty(FILE_META_KEY_ACCESS_CONDITION);
    };

    /**
     * Check if file has embargo date field
     *
     * @param file
     * @returns {boolean}
     */
    hasEmbargoDate = (file) => {
        return file.hasOwnProperty(FILE_META_KEY_EMBARGO_DATE) && !!file[FILE_META_KEY_EMBARGO_DATE];
    };

    /**
     * Check if entire file uploader is valid including access conditions, embargo date and t&c
     *
     * @param filesInQueue
     * @param isTermsAndConditionsAccepted
     * @returns {boolean}
     */
    isFileUploadValid = ({filesInQueue, isTermsAndConditionsAccepted}) => {
        let isValid = true;

        if (this.props.requireOpenAccessStatus) {
            if (filesInQueue.filter((file) => (!this.hasAccess(file))).length > 0) {
                isValid = false;
            }
            if (filesInQueue
                .filter((file) => (this.isOpenAccess(file[FILE_META_KEY_ACCESS_CONDITION])))
                .filter((file) => (!(this.hasEmbargoDate(file) && isTermsAndConditionsAccepted)))
                .length > 0) {
                isValid = false;
            }
        }

        return isValid;
    };

    /**
     * Process errors
     *
     * @private
     */
    processErrors = (errors) => {
        const {validation} = this.props.locale;
        const errorMessages = [];
        let message = '';

        Object.keys(errors).map(errorCode => {
            const fileNames = errors[errorCode];
            if (fileNames.length > 0) {
                message = validation[errorCode]
                    .replace('[numberOfFiles]', fileNames.length)
                    .replace('[filenames]', fileNames.join(', '));

                if (errorCode === 'maxFiles') {
                    errorMessages.push(message.replace('[maxNumberOfFiles]', `${this.props.fileRestrictionsConfig.fileUploadLimit}`));
                } else {
                    errorMessages.push(message);
                }
            }
        });

        this.setState({
            errorMessage: errorMessages.join('; ')
        });
    };

    /**
     * Remove duplicate files from filtered files
     * @param accepted
     * @returns {Set}
     */
    removeDuplicate = (accepted) => {
        // Get the file names already in queue
        const filesInQueue = new Set(this.state.filesInQueue.map(file => file.name));

        // Ignore files from accepted files which are already in files queue
        const filteredDuplicates = new Set([...accepted].filter(file => !filesInQueue.has(file.name)));

        // Return new set of unique files
        return new Set([...this.state.filesInQueue, ...filteredDuplicates]);
    };

    render() {
        const {instructions, accessTermsAndConditions} = this.props.locale;
        const {maxFileSize, fileSizeUnit, fileUploadLimit, fileNameRestrictions} = this.props.fileRestrictionsConfig;
        const {requireOpenAccessStatus} = this.props;
        const {filesInQueue, isTermsAndConditionsAccepted, errorMessage} = this.state;
        const {errorTitle, successTitle, successMessage} = this.props.locale;

        const instructionsDisplay = instructions
            .replace('[fileUploadLimit]', fileUploadLimit)
            .replace('[maxFileSize]', `${maxFileSize}`)
            .replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

        const filesInQueueRow = filesInQueue.map((file, index) => {
            return (
                <FileUploadRow
                    key={file.name}
                    index={index}
                    uploadedFile={file}
                    fileSizeUnit={fileSizeUnit}
                    onDelete={this._deleteFile}
                    onAccessConditionChange={this._updateFileAccessCondition}
                    onEmbargoDateChange={this._updateFileEmbargoDate}
                    defaultAccessCondition={this.props.defaultQuickTemplateId}
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
                    disabled={this.props.disabled}
                    fileNameRestrictions={fileNameRestrictions}
                    onDrop={this._handleDroppedFiles} />
                {
                    filesInQueue.length > 0 && (
                        <Alert title={successTitle} message={successMessage.replace('[numberOfFiles]', filesInQueue.length)} type="done" />
                    )
                }
                {
                    errorMessage.length > 0 && (
                        <Alert title={errorTitle} message={errorMessage} type="error" />
                    )
                }
                {
                    filesInQueue.length > 0 &&
                    <div className="metadata-container">
                        <FileUploadRowHeader
                            onDeleteAll={this._deleteAllFiles}
                            requireOpenAccessStatus={requireOpenAccessStatus && !this.props.defaultQuickTemplateId}
                            disabled={this.props.disabled} />

                        {filesInQueueRow}

                        {
                            requireOpenAccessStatus && this.isAnyOpenAccess(filesInQueue) &&
                            <div className={`open-access-checkbox${!isTermsAndConditionsAccepted ? ' error-checkbox' : ''}`}>
                                <Checkbox label={accessTermsAndConditions} onCheck={this._acceptTermsAndConditions} checked={isTermsAndConditionsAccepted} disabled={this.props.disabled} />
                            </div>
                        }
                    </div>
                }
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
