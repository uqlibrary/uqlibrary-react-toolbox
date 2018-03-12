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
        defaultQuickTemplateId: PropTypes.number,
        maxFiles: PropTypes.number.isRequired,
        fileNameRestrictions: PropTypes.string.isRequired
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
            fileSizeUnit: 'G'
        },
        requireOpenAccessStatus: false,
        fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
    };

    constructor(props) {
        super(props);
        this.state = {
            filesInQueue: [],
            termsAndConditions: false,
            errorMessage: '',
            successMessage: ''
        };

        /*
         * Hold all errors temporarily in map
         */
        this.errors = new Map();
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
        this.setState({
            filesInQueue: [
                ...this.state.filesInQueue.slice(0, index),
                ...this.state.filesInQueue.slice(index + 1)
            ],
            errorMessage: ''
        });
    };

    /**
     * Delete all files
     *
     * @private
     */
    _deleteAllFiles = () => {
        this.setState({filesInQueue: [], errorMessage: ''});
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
        const file = new File([fileToUpdate], fileToUpdate.name);

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
        const file = new File([fileToUpdate], fileToUpdate.name);

        file[FILE_META_KEY_ACCESS_CONDITION] = fileToUpdate[FILE_META_KEY_ACCESS_CONDITION];
        file[FILE_META_KEY_EMBARGO_DATE] = newValue;

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
        this.setState({termsAndConditions: value});
    };

    /**
     * Handle accepted, rejected and dropped folders and display proper alerts
     *
     * @param accepted
     * @param errorsFromDropzone
     */
    _handleDroppedFiles = (accepted, errorsFromDropzone) => {
        const errors = new Map(Array.from(errorsFromDropzone));
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
            errors.set('maxFiles', [...uniqueFilesToQueue].slice(fileUploadLimit).map(file => file.name));

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
            termsAndConditions: this.state.termsAndConditions && !this.areAllClosedAccess(filesInQueue)
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
            filesInQueue: this.props.defaultQuickTemplateId ? this.setDefaultAccessConditionId(files) : [...files],
            focusOnIndex: this.state.filesInQueue.length,
            errorMessage: ''
        });
    };

    /**
     * Set default access condition if defaultQuickTemplateId is provided
     *
     * @param files
     */
    setDefaultAccessConditionId = (files) => {
        return files.map(file => {
            file[FILE_META_KEY_ACCESS_CONDITION] = this.props.defaultQuickTemplateId;
            return new File([file], file.name);
        });
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
     * Check if all files are closed accessed
     *
     * @param files
     * @returns {boolean}
     */
    areAllClosedAccess = (files) => {
        return files.filter((file) => (this.hasAccess(file) && !this.isOpenAccess(file[FILE_META_KEY_ACCESS_CONDITION]))).length === files.length;
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
     * @param termsAndConditions
     * @returns {boolean}
     */
    isFileUploadValid = ({filesInQueue, termsAndConditions}) => {
        let isValid = true;

        if (this.props.requireOpenAccessStatus) {
            if (filesInQueue.filter((file) => (!this.hasAccess(file))).length > 0) {
                isValid = false;
            }
            if (filesInQueue
                .filter((file) => (this.isOpenAccess(file[FILE_META_KEY_ACCESS_CONDITION])))
                .filter((file) => (!(this.hasEmbargoDate(file) && termsAndConditions)))
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

        for (const [errorCode, fileNames] of errors.entries()) {
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
        }

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
        const {maxFileSize, fileSizeUnit, fileUploadLimit} = this.props.fileRestrictionsConfig;
        const {requireOpenAccessStatus} = this.props;
        const {filesInQueue, termsAndConditions, errorMessage} = this.state;
        const {errorTitle, successTitle, successMessage} = this.props.locale;

        const instructionsDisplay = instructions
            .replace('[fileUploadLimit]', fileUploadLimit)
            .replace('[maxFileSize]', `${maxFileSize}`)
            .replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

        const filesInQueueRow = this.state.filesInQueue.map((file, index) => {
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
                    fileNameRestrictions={this.props.fileNameRestrictions}
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
                <div
                    className="metadata-container"
                    style={filesInQueueRow.length === 0 ? ({display: 'none'}) : ({display: 'block'})}>
                    {
                        filesInQueue.length > 0 &&
                        <FileUploadRowHeader
                            onDeleteAll={this._deleteAllFiles}
                            requireOpenAccessStatus={requireOpenAccessStatus && !this.props.defaultQuickTemplateId}
                            disabled={this.props.disabled} />
                    }

                    {filesInQueueRow}

                    {
                        requireOpenAccessStatus && this.isAnyOpenAccess(filesInQueue) &&
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
