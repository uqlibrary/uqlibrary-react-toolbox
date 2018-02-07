import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {Alert} from '../../Alert';
import FileUploadDropzoneStaticContent from './FileUploadDropzoneStaticContent';

class FileUploadDropzone extends PureComponent {
    static propTypes = {
        onDropped: PropTypes.func.isRequired,
        maxSize: PropTypes.number.isRequired,
        maxFiles: PropTypes.number.isRequired,
        uploadedFiles: PropTypes.array,
        locale: PropTypes.object.isRequired,
        clearErrors: PropTypes.bool,
        disabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: []
        };
        this.dropzoneRef = null;
        this.accepted = new Map();
        this.errors = new Map();

        this._onDrop.bind(this);
        this._onKeyPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.clearAccepted();
        this.add(nextProps.uploadedFiles);
        this.resetErrors();

        if (nextProps.clearErrors) this.processErrors(this.errors);
    }

    /**
     * Clear accepted files
     */
    clearAccepted = () => {
        this.accepted = new Map();
    };

    /**
     * Diff of two sets
     *
     * @param accepted
     * @param rejected
     * @returns {Set}
     * @private
     */
    difference = (accepted, rejected) => {
        return new Set([...accepted].filter(file => !rejected.has(file)));
    };

    /**
     * Add given files
     *
     * @param files
     * @private
     */
    add = (files) => {
        [...files].map(file => this.accepted.set(file.name, file));
    };

    /**
     * Validate file
     *
     * @param file
     * @returns {boolean}
     * @private
     */
    validate = (file) => {
        const type = file.type === '';
        if (type) {
            this.setError('folder', file);
        }

        const length = file.name.length > 45;
        if (length) {
            this.setError('fileNameLength', file);
        }

        const periodOrSpace = file.name.split('.').length > 2 || file.name.split(' ').length > 1;
        if (periodOrSpace) {
            this.setError('fileName', file);
        }

        return type || length || periodOrSpace;
    };

    /**
     * Set file/s error for given errorType
     *
     * @param errorType
     * @param file
     * @private
     */
    setError = (errorType, file) => {
        let files;
        if (!(file instanceof Array)) {
            files = [file];
        } else {
            files = file;
        }
        files.map(file => this.errors.set(errorType, this.errors.get(errorType) ? [...this.errors.get(errorType), file] : [file]));
    };

    /**
     * Process errors
     *
     * @private
     */
    processErrors = (errors) => {
        const {single, multiple} = this.props.locale.validation;
        const errorMessages = [];
        let message;

        for (const [errorCode, files] of errors.entries()) {
            const fileNames = [];
            files.map((file) => {
                fileNames.push(file.name);
            });

            if (files.length > 1) {
                message = multiple[errorCode]
                    .replace('[numberOfFiles]', files.length)
                    .replace('[filenames]', fileNames.join(', '));
            } else if (files.length === 1) {
                message = single[errorCode].replace('[filename]', fileNames.join(', '));
            }

            if (errorCode === 'maxFiles') {
                errorMessages.push(message.replace('[maxNumberOfFiles]', this.props.maxFiles));
            } else {
                errorMessages.push(message);
            }
        }

        this.setState({
            errorMessage: errorMessages.join('; ')
        });

        this.resetErrors();
    };

    /**
     * Reset errors
     *
     * @private
     */
    resetErrors = () => {
        this.errors = new Map();
    };

    /**
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param accepted
     * @param rejected
     * @private
     */
    _onDrop = (accepted, rejected) => {
        /*
         * Set error for rejected files (maxFileSize rule)
         */
        if (rejected.length > 0) {
            this.setError('maxFileSize', rejected);
        }

        /*
         * Validate accepted files and get list of invalid files (check fileName, fileNameLength, folder)
         */
        const invalid = accepted.filter((file) => {
            return this.validate(file);
        });

        /*
         * Remove invalid files
         */
        const filtered = this.difference(new Set(accepted), new Set(invalid));

        /*
         * Duplicates will be removed by setting up file.name as key
         */
        this.add(filtered);

        /*
         * If max files uploaded, send max files and set error for ignored files
         */
        const {maxFiles} = this.props;
        if (this.accepted.size > maxFiles) {
            this.props.onDropped([...this.accepted.values()].slice(0, maxFiles));
            this.setError('maxFiles', [...this.accepted.values()].slice(maxFiles));
        } else {
            this.props.onDropped([...this.accepted.values()]);
        }

        /*
         * Process any errors
         */
        this.processErrors(this.errors);
    };

    /**
     * Open dropzone on key pressed
     */
    _onKeyPress = () => {
        this.dropzoneRef.open();
    };

    render() {
        const {errorTitle} = this.props.locale;
        const {errorMessage} = this.state;

        return (
            <div>
                <div className="columns">
                    <div className="column"  tabIndex="0" onKeyPress={this._onKeyPress}>
                        <Dropzone
                            ref={(node) => {this.dropzoneRef = node;}}
                            maxSize={this.props.maxSize}
                            onDrop={this._onDrop}
                            style={{padding: '0px'}}
                            disabled={this.props.disabled}
                            disableClick={this.props.disabled}
                            disablePreview>
                            <FileUploadDropzoneStaticContent txt={this.props.locale}/>
                        </Dropzone>
                    </div>
                </div>
                {
                    errorMessage.length > 0 && (
                        <Alert title={errorTitle} message={errorMessage} type="error" />
                    )
                }
            </div>
        );
    }
}

export default FileUploadDropzone;

