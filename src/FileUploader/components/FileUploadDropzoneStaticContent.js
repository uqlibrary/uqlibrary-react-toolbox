import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

const FileUploadDropzoneStaticContent = ({txt}) => (
    <div className="columns file-instructions">
        <div className="column">
            {txt.fileUploadRestrictionHeading}
            {txt.fileUploadRestrictions}
        </div>
        <div className="column upload-instructions">
            <FontIcon className="material-icons">cloud_upload</FontIcon>
            {txt.fileUploadInstruction}
        </div>
    </div>
);

FileUploadDropzoneStaticContent.propTypes = {
    txt: PropTypes.object
};

export default FileUploadDropzoneStaticContent;
