import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import FileUploadDropzoneStaticContent from './FileUploadDropzoneStaticContent';

class FileUploadDropzone extends PureComponent {
    static propTypes = {
        onDrop: PropTypes.func.isRequired,
        maxSize: PropTypes.number.isRequired,
        locale: PropTypes.object.isRequired,
        disabled: PropTypes.bool,
        fileNameRestrictions: PropTypes.instanceOf(RegExp)
    };

    constructor(props) {
        super(props);
        this.dropzoneRef = null;
        this.errors = new Map([]);
    }

    /**
     * Get the list of folders using FileReader API
     *
     * @param accepted files and/or folders
     * @returns {Promise.<*>}
     */
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

    /**
     * Diff of two array
     *
     * @param files1
     * @param files2
     * @returns Array
     * @private
     */
    difference = (files1, files2) => {
        const set1 = new Set(files1);
        const set2 = new Set(files2);

        const difference = new Set([...set1].filter(file => !set2.has(file)));

        return [...difference];
    };

    filterFilesWithInvalidNames = (files) => {
        const filesToFilter = [...files];
        // const regex = new RegExp(this.props.fileNameRestrictions, 'gi');
        /*
         * Validate accepted files and get list of invalid files (check fileName, fileNameLength)
         */
        return filesToFilter.filter(file => {
            return new RegExp(this.props.fileNameRestrictions, 'gi').test(file.name);
        });
    };

    /**
     * Filter accepted files from dropzone
     *  - Remove folders and set error for folders
     *  - Remove files with invalid names and set error
     *  - Hand over valid files only to file uploader
     *
     * @param accepted
     * @param folders
     */
    filterOnDrop = (accepted, folders) => {
        const filesWithoutFolders = folders.length > 0 ? accepted.filter(file => folders.indexOf(file.name) === -1) : accepted;

        const filesWithValidNames = this.filterFilesWithInvalidNames([...filesWithoutFolders]);

        const invalidFiles = this.difference(filesWithoutFolders, filesWithValidNames);

        this.errors.set('folder', folders);
        this.errors.set('fileName', invalidFiles.map(file => file.name));

        this.props.onDrop([...filesWithValidNames], this.errors);

        this.errors = new Map([]);
    };

    /**
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param accepted
     * @param rejected
     * @param event
     * @private
     */
    _onDrop = (accepted, rejected, event) => {
        this.errors.set('maxFileSize', rejected.map(file => file.name));

        /*
         * From droppedEvent dataTransfer items, determine which items are folders
         *
         * Safari and IE doesn't support event.dataTransfer.items
         * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items
         *
         * Using FileReader API async to read slice of file will throw an error if it's a folder
         */
        if (!!event && !!event.dataTransfer && !!event.dataTransfer.items) {
            const folders =  Array.prototype.filter.call(event.dataTransfer.items, (item) => (item.webkitGetAsEntry().isDirectory))
                .map((item) => item.webkitGetAsEntry().name);

            this.filterOnDrop([...accepted], [...folders]);
        } else {
            this.getDroppedFolders([...accepted]).then(result => {
                const folders = result.filter(folder => !!folder);

                this.filterOnDrop([...accepted], [...folders]);
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
                            <FileUploadDropzoneStaticContent txt={locale}/>
                        </Dropzone>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUploadDropzone;

