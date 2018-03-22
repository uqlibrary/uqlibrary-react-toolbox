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
     * @param filesAndFolders files and/or folders
     * @param errors
     * @returns {Promise.<*>}
     */
    removeDroppedFolders(filesAndFolders, errors) {
        return Promise.all(
            filesAndFolders.map(file => {
                return new Promise(resolve => {
                    this.readFile(file, errors, resolve);
                });
            })
        );
    }

    /**
     * Try to read fileOrFolder and set error for a folder
     *
     * @param fileOrFolder
     * @param errors
     * @param resolve
     */
    readFile = (fileOrFolder, errors, resolve) => {
        const fileReader = new FileReader();
        fileReader.onerror = () => {
            errors.push(fileOrFolder.name);
            return resolve(false);
        };
        fileReader.onload = () => resolve(fileOrFolder);
        const slice = fileOrFolder.slice(0, 10);
        return fileReader.readAsDataURL(slice);
    };

    /**
     * Remove duplicate files from given accepted files
     *
     * @param incomingFiles
     * @param filesInQueue - list of names of files in queue
     * @returns Object
     */
    removeDuplicate = (incomingFiles, filesInQueue) => {
        // Ignore files from incomingFiles which are already in files queue
        const uniqueFiles = incomingFiles.filter(file => filesInQueue.indexOf(file.name) === -1);
        const duplicateFiles = incomingFiles.filter(file => filesInQueue.indexOf(file.name) >= 0).map(file => file.name);

        // Return unique files and errors with duplicate file names
        return {uniqueFiles: uniqueFiles, duplicateFiles: duplicateFiles};
    };

    /**
     * Remove invalid file names
     *
     * @param incomingFiles - array of files
     * @param fileNameRestrictions - RegExp
     * @returns Object
     */
    removeInvalidFileNames = (incomingFiles, fileNameRestrictions) => {
        const validFiles = incomingFiles
            .filter(file => (!file && new RegExp(fileNameRestrictions, 'gi').test(file.name)));
        const invalidFileNames = incomingFiles
            .filter(file => (!file && new RegExp(fileNameRestrictions, 'gi').test(file.name)))
            .map(file => file.name);

        return {validFiles: validFiles, invalidFileNames: invalidFileNames};
    };

    /**
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param incomingFiles
     * @param rejectedFiles
     * @private
     */
    _onDrop = (incomingFiles, rejectedFiles) => {
        const {fileNameRestrictions, filesInQueue, fileUploadLimit} = this.props;
        const notFiles = [];

        // Remove folders from accepted files (async)
        this.removeDroppedFolders([...incomingFiles], notFiles)
            .then(onlyFiles => {
                // Remove invalid file names
                const {validFiles, invalidFileNames} = this.removeInvalidFileNames(onlyFiles, fileNameRestrictions);

                // Remove duplicate files from accepted files
                const {uniqueFiles, duplicateFiles} = this.removeDuplicate(validFiles, filesInQueue);

                // Get file names to display in error message for file upload limit
                const tooManyFiles = uniqueFiles.slice(fileUploadLimit - filesInQueue.length).map(file => file.name);

                // If max files uploaded, get files allowed to upload
                const cleanFiles = uniqueFiles
                    .slice(0, fileUploadLimit - filesInQueue.length)
                    .map(file => ({fileData: file, name: file.name, size: file.size}));

                this.props.onDrop(
                    cleanFiles,
                    {
                        tooBigFiles: rejectedFiles.map(file => file.name),
                        notFiles: notFiles,
                        invalidFileNames: invalidFileNames,
                        duplicateFiles: duplicateFiles,
                        tooManyFiles: tooManyFiles
                    }
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
                            ref={(ref) => {this.dropzoneRef = ref;}}
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

