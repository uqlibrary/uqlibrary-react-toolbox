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
    };

    constructor(props) {
        super(props);
        this.dropzoneRef = null;
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
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param accepted
     * @param rejected
     * @private
     */
    _onDrop = (accepted, rejected, event) => {
        /*
         * From droppedEvent dataTransfer items, determine which items are folders
         *
         * Safari and IE doesn't support event.dataTransfer.items
         * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items
         *
         * Using FileReader API async to read slice of file will throw an error if it's a folder
         */
        let droppedFolders = [];
        if (!!event && !!event.dataTransfer && !!event.dataTransfer.items) {
            droppedFolders =  Array.prototype.filter.call(event.dataTransfer.items, (item) => (item.webkitGetAsEntry().isDirectory))
                .map((item) => item.webkitGetAsEntry().name);
            this.props.onDrop([...accepted], [...rejected], [...droppedFolders]);
        } else {
            this.getDroppedFolders([...accepted]).then(result => {
                droppedFolders = result.filter(folder => !!folder);
                this.props.onDrop([...accepted], [...rejected], [...droppedFolders]);
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

