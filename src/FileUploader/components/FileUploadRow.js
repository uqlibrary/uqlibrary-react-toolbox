import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import {ConfirmDialogBox} from '../../ConfirmDialogBox';

import FileUploadAccessSelector from './FileUploadAccessSelector';
import FileUploadEmbargoDate from './FileUploadEmbargoDate';

import {OPEN_ACCESS_ID} from './FileUploadAccessSelector';
import {sizeUnitText, sizeBase} from './FileUploader';

export const FILE_META_KEY_ACCESS_CONDITION = 'access_condition_id';
export const FILE_META_KEY_EMBARGO_DATE = 'date';

export class FileUploadRow extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        uploadedFile: PropTypes.object.isRequired,
        onDelete: PropTypes.func.isRequired,
        locale: PropTypes.object,
        progress: PropTypes.number,
        isUploadInProgress: PropTypes.bool,
        requireOpenAccessStatus: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        focusOnIndex: PropTypes.number,
        onAccessConditionChange: PropTypes.func,
        onEmbargoDateChange: PropTypes.func
    };

    static defaultProps = {
        locale: {
            deleteHint: 'Remove this file',
            deleteRecordConfirmation: {
                confirmationTitle: 'Delete file',
                confirmationMessage: 'Are you sure you want to remove this file from the uploaded queue?',
                cancelButtonLabel: 'No',
                confirmButtonLabel: 'Yes'
            },
            filenameColumn: 'File name',
            fileAccessColumn: 'File access',
            embargoDateColumn: 'Embargo date',
            embargoDateClosedAccess: 'No date required',
            uploadInProgressTxt: 'Uploading...'
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const indexToFocus = this.props.focusOnIndex;
        if (this.refs.hasOwnProperty(`accessConditionSelector${indexToFocus}`)) {
            ReactDOM.findDOMNode(this.refs[`accessConditionSelector${indexToFocus}`]).getElementsByTagName('button').item(0).focus();
        } else if (this.refs.hasOwnProperty(`fileName${indexToFocus}`)) {
            // if access condition is not required, then scroll into filename
            this.refs[`fileName${indexToFocus}`].scrollIntoView();
        }
    }

    _showConfirmation = () => {
        this.confirmationBox.showConfirmation();
    };

    _deleteFile = () => {
        if (this.props.onDelete) this.props.onDelete(this.props.uploadedFile, this.props.index);
    };

    calculateFilesizeToDisplay = (size) => {
        const exponent = Math.floor(Math.log(size) / Math.log(sizeBase));
        return `${(size / Math.pow(sizeBase, exponent)).toFixed(1)}${Object.keys(sizeUnitText).map(key => (sizeUnitText[key]))[exponent]}`;
    };

    _updateAccessCondition = (newValue) => {
        this.props.onAccessConditionChange(this.props.uploadedFile, this.props.index, newValue);
    };

    _updateEmbargoDate = (newValue) => {
        this.props.onEmbargoDateChange(this.props.uploadedFile, this.props.index, newValue);
    };

    render() {
        const {deleteRecordConfirmation, filenameColumn, fileAccessColumn, embargoDateColumn, embargoDateClosedAccess, uploadInProgressTxt, deleteHint} = this.props.locale;
        const {progress, uploadedFile, index, requireOpenAccessStatus, disabled, isUploadInProgress} = this.props;

        const accessConditionId = uploadedFile[FILE_META_KEY_ACCESS_CONDITION];
        const embargoDate = uploadedFile[FILE_META_KEY_EMBARGO_DATE];

        return (
            <div className="columns is-gapless is-multiline uploadedFileRow datalist datalist-row is-clearfix">
                <ConfirmDialogBox
                    onRef={ref => (this.confirmationBox = ref)}
                    onAction={this._deleteFile}
                    locale={deleteRecordConfirmation} />
                <div className="column datalist-text file-info is-6-desktop is-5-tablet is-12-mobile">
                    <FontIcon className="material-icons mobile-icon is-hidden-desktop is-hidden-tablet">attachment</FontIcon>
                    <div className="file-name" ref={`fileName${index}`}>
                        <span className="truncated">{uploadedFile.name} ({this.calculateFilesizeToDisplay(uploadedFile.size)})</span>
                        <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{filenameColumn}</span>
                    </div>
                </div>
                <div className="column datalist-text is-3-desktop is-4-tablet is-12-mobile">
                    {
                        requireOpenAccessStatus &&
                            <div className="file-access-selector">
                                <FontIcon className="material-icons mobile-icon is-hidden-desktop is-hidden-tablet">lock_outline</FontIcon>
                                <div className="select-container">
                                    <FileUploadAccessSelector value={accessConditionId} onChange={this._updateAccessCondition} disabled={disabled} ref={`accessConditionSelector${index}`} />
                                    <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{fileAccessColumn}</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="column datalist-text is-2-desktop is-2-tablet is-three-quarters-mobile is-inline-block-mobile">
                    <div className="embargo-date-info">
                        {
                            requireOpenAccessStatus &&
                            <FontIcon className="material-icons mobile-icon is-hidden-desktop is-hidden-tablet">date_range</FontIcon>
                        }
                        {
                            requireOpenAccessStatus && !(accessConditionId === OPEN_ACCESS_ID) &&
                            <div className="no-embargo-date">
                                <span>{embargoDateClosedAccess}</span>
                                <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{embargoDateColumn}</span>
                            </div>
                        }
                        {
                            requireOpenAccessStatus && (accessConditionId === OPEN_ACCESS_ID) &&
                            <div className="embargo-date-selector">
                                <FileUploadEmbargoDate value={new Date(embargoDate)} onChange={this._updateEmbargoDate} disabled={disabled} />
                                <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{embargoDateColumn}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="column is-1-desktop is-1-tablet is-one-quarter-mobile is-inline-block-mobile is-centered is-vcentered">
                    {
                        !isUploadInProgress &&
                        <div className="datalist-buttons">
                            <IconButton tooltip={deleteHint} onTouchTap={this._showConfirmation} disabled={disabled}>
                                <FontIcon className="material-icons deleteIcon">delete</FontIcon>
                            </IconButton>
                        </div>
                    }
                    {
                        isUploadInProgress && progress !== 100 &&
                        <div className="upload-progress-info">
                            <div className="upload-progress">
                                {
                                    progress > 0 &&
                                    <CircularProgress
                                        mode="determinate"
                                        value={progress}
                                        size={20}
                                        thickness={4}
                                    />
                                }
                                {
                                    progress === 0 &&
                                    <CircularProgress
                                        size={20}
                                        thickness={4}
                                    />
                                }
                            </div>
                            <div className="upload-progress-number">
                                {
                                    <span aria-label={progress > 0 ? `${progress}%` : uploadInProgressTxt}>
                                        {progress > 0 ? `${progress}%` : uploadInProgressTxt}
                                    </span>
                                }
                            </div>
                        </div>
                    }
                    {
                        isUploadInProgress && progress === 100 &&
                        <div className="upload-progress">
                            <FontIcon className="material-icons green-tick">done</FontIcon>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.get('fileUpload')[ownProps.uploadedFile.name] || 0,
        isUploadInProgress: state.get('fileUpload').isUploadInProgress
    };
};

export default connect(mapStateToProps)(FileUploadRow);
