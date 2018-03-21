import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import FileUploadDropzoneStaticContent from './FileUploadDropzoneStaticContent';

class FileUploadDropzone extends PureComponent {
    static propTypes = {
        onDrop: PropTypes.func.isRequired,
        maxSize: PropTypes.number.isRequired,
        locale: PropTypes.object.isRequired,
        filesInQueue: PropTypes.array,
        fileUploadLimit: PropTypes.number,
        disabled: PropTypes.bool,
        fileNameRestrictions: PropTypes.instanceOf(RegExp).isRequired
    };

    constructor(props) {
        super(props);
        this.dropzoneRef = null;
    }

    /**
     * Remove folders from the list
     *
     * @param accepted files and/or folders
     * @param errors
     * @returns {Promise.<*>}
     */
    removeDroppedFolders(accepted, errors) {
        const acceptedFilesAndFolders = [...accepted];
        return Promise.all(
            acceptedFilesAndFolders.map(file => {
                return new Promise(resolve => {
                    this.readFile(file, errors, resolve);
                });
            })
        );
    }

    /**
     * Try to read file and set error for a folder
     *
     * @param file
     * @param errors
     * @param resolve
     */
    readFile = (file, errors, resolve) => {
        const fileReader = new FileReader();
        fileReader.onerror = () => {
            errors.folder.push(file.name);
            return resolve(false);
        };
        fileReader.onload = () => resolve(file);
        const slice = file.slice(0, 10);
        return fileReader.readAsDataURL(slice);
    };

    /**
     * Remove duplicate files from given accepted files
     *
     * @param accepted
     * @param filesInQueue - list of names of files in queue
     * @returns Object
     */
    removeDuplicate = (accepted, filesInQueue) => {
        const duplicateFiles = [];

        // Ignore files from accepted files which are already in files queue
        const filteredDuplicates = [...accepted].filter(file => {
            filesInQueue.indexOf(file.name) >= 0 && duplicateFiles.push(file.name);
            return filesInQueue.indexOf(file.name) === -1;
        });

        // Return unique files and errors with duplicate file names
        return {uniqueFiles: [...filteredDuplicates], duplicateFiles: duplicateFiles};
    };

    /**
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param accepted
     * @param rejected
     * @private
     */
    _onDrop = (accepted, rejected) => {
        const errors = {
            maxFileSize: rejected.map(file => file.name),
            folder: [],
            fileName: [],
            duplicateFiles: [],
            maxFiles: []
        };

        const {fileNameRestrictions, filesInQueue, fileUploadLimit} = this.props;
        /*
         * Remove folders from accepted files (async)
         */
        this.removeDroppedFolders([...accepted], errors)
            .then(result => {
                const filtered = [...result]
                    .filter(file => {
                        const valid = file && new RegExp(fileNameRestrictions, 'gi').test(file.name);
                        file && !valid && errors.fileName.push(file.name);
                        return file && valid;
                    });

                // Remove duplicate files from accepted files
                const {uniqueFiles, duplicateFiles} = this.removeDuplicate([...filtered], filesInQueue);

                // Get file names to display in error message for file upload limit
                const filesExceedingMaxFileUploadLimit = uniqueFiles.slice(fileUploadLimit - filesInQueue.length).map(file => file.name);

                // If max files uploaded, get files allowed to upload
                const uniqueFilesToQueue = [...uniqueFiles]
                    .slice(0, fileUploadLimit - filesInQueue.length)
                    .map(file => ({fileData: file, name: file.name, size: file.size}));

                this.props.onDrop(
                    [...uniqueFilesToQueue],
                    {...errors, duplicateFiles: duplicateFiles, maxFiles: filesExceedingMaxFileUploadLimit}
                );
            });
    };

    /**
     * Open dropzone on key pressed
     */
    _onKeyPress = () => {
        this.dropzoneRef.open();
    };

    render() {
        const {maxSize, disabled, locale} = this.props;
        return (
            <div>
                <div className="columns">
                    <div className="column"  tabIndex="0" onKeyPress={this._onKeyPress}>
                        <Dropzone
                            ref={(node) => {this.dropzoneRef = node;}}
                            maxSize={maxSize}
                            onDrop={this._onDrop}
                            style={{padding: '0px'}}
                            disabled={disabled}
                            disableClick={disabled}
                            disablePreview>
                            <FileUploadDropzoneStaticContent locale={locale}/>
                        </Dropzone>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUploadDropzone;

