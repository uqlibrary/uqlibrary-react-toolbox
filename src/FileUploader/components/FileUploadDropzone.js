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
        disabled: PropTypes.bool,
        fileNameRestrictions: PropTypes.string.isRequired,
    };

    static defaultProps = {
        fileNameRestrictions: /^(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
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
        const restriction = (new RegExp(this.props.fileNameRestrictions, 'gi')).test(file.name);

        if (restriction) {
            this.setError('fileName', file);
            return true;
        }

        return false;
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
        const {validation} = this.props.locale;
        const errorMessages = [];
        let message;

        for (const [errorCode, files] of errors.entries()) {
            const fileNames = [];
            files.map((file) => {
                fileNames.push(file.name);
            });

            if (files.length > 0) {
                message = validation[errorCode]
                    .replace('[numberOfFiles]', files.length)
                    .replace('[filenames]', fileNames.join(', '));
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

    getDroppedFolders(accepted) {
        const acceptedFilesAndFolders = [...accepted];
        return Promise.all(
            acceptedFilesAndFolders.map(file => {
                return new Promise(resolve => {
                    const fileReader = new FileReader();
                    fileReader.onerror = () => resolve(file.name);
                    fileReader.onload = () => resolve();
                    const slice = file.slice(0, 10);
                    fileReader.readAsDataURL(slice);
                });
            })
        );
    }

    handleDroppedFiles = (accepted, rejected, droppedFolders) => {
        /*
         * Set error for folder
         */
        if (droppedFolders.length > 0) {
            this.setError('folder', accepted.filter(file => droppedFolders.indexOf(file.name) >= 0));
        }

        /*
         * Set error for rejected files (maxFileSize rule)
         */
        if (rejected.length > 0) {
            this.setError('maxFileSize', rejected);
        }

        /*
         * Folders are accepted by dropzone so remove folders from accepted list
         */
        const acceptedFiles = droppedFolders.length > 0 ? accepted.filter(file => droppedFolders.indexOf(file.name) === -1) : accepted;

        /*
         * Validate accepted files and get list of invalid files (check fileName, fileNameLength, folder)
         */
        const invalid = acceptedFiles.filter((file) => {
            return this.validate(file);
        });

        /*
         * Remove invalid files
         */
        const filtered = this.difference(new Set(acceptedFiles), new Set(invalid));

        /*
         * Duplicates will be removed by setting up file.name as key
         */
        this.add(filtered);

        /*
         * If max files uploaded, send max files and set error for ignored files
         */
        const {maxFiles} = this.props;
        if (this.accepted.size > maxFiles) {
            this.setError('maxFiles', [...this.accepted.values()].slice(maxFiles));
            this.props.onDropped([...this.accepted.values()].slice(0, maxFiles));
        } else {
            this.props.onDropped([...this.accepted.values()]);
        }

        /*
         * Process any errors
         */
        this.processErrors(this.errors);
    };

    /**
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param accepted
     * @param rejected
     * @private
     */
    _onDrop = (accepted, rejected, event) => {
        /*
         * From droppedEvent dataTransfer items, determine which items are folders
         * Safari and IE doesn't support event.dataTransfer.items
         * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items
         *
         * Workaround: check if file doesn't have type set and size is multiple of 4096 bytes
         *  - This may leave some files without type and size multiple of 4096 to be recognised as folders
         *  - Or some folders with allowed extensions to be recognized as files
         *
         * https://stackoverflow.com/questions/25016442/how-to-distinguish-if-a-file-or-folder-is-being-dragged-prior-to-it-being-droppe
         */
        let droppedFolders = [];
        if (!!event && !!event.dataTransfer && !!event.dataTransfer.items) {
            droppedFolders =  Array.prototype.filter.call(event.dataTransfer.items, (item) => (item.webkitGetAsEntry().isDirectory))
                .map((item) => item.webkitGetAsEntry().name);
            this.handleDroppedFiles([...accepted], [...rejected], [...droppedFolders]);
        } else {
            this.getDroppedFolders([...accepted]).then(result => {
                droppedFolders = result.filter(folder => !!folder);
                this.handleDroppedFiles([...accepted], [...rejected], [...droppedFolders]);
            });
        }
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

