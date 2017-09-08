import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import {ConfirmDialogBox} from '../..';
import FileUploadAccessSelector from './FileUploadAccessSelector';
import FileUploadEmbargoDate from './FileUploadEmbargoDate';

import {OPEN_ACCESS_ID} from './FileUploadAccessSelector';
import { sizeUnitText, sizeBase } from './FileUploader';

const moment = require('moment');

class FileUploadRow extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        uploadedFile: PropTypes.object.isRequired,
        onDelete: PropTypes.func.isRequired,
        onAttributeChanged: PropTypes.func.isRequired,
        locale: PropTypes.object,
        progress: PropTypes.number,
        requireFileAccess: PropTypes.bool.isRequired,
        fileSizeUnit: PropTypes.string,
        disabled: PropTypes.bool
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
            embargoDateClosedAccess: 'No date required'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            access_condition_id: null,
            date: null
        };
    }

    _showConfirmation = () => {
        this.confirmationBox.showConfirmation();
    };

    _deleteFile = () => {
        if (this.props.onDelete) this.props.onDelete(this.props.uploadedFile, this.props.index);
    };

    _updateFileMetadata = (update) => {
        if (update.key === 'access_condition_id' && !this.isOpenAccess(update.value) && this.props.uploadedFile.hasOwnProperty('date')) {
            delete this.props.uploadedFile.date;
        }

        if (update.key === 'access_condition_id' && this.isOpenAccess(update.value) && !this.props.uploadedFile.hasOwnProperty('date')) {
            this.props.uploadedFile.date = moment().format('DD-MM-YYYY');
        }

        this.setState({ [update.key]: update.value });
        this.props.uploadedFile[update.key] = update.value;
        if (this.props.onAttributeChanged) this.props.onAttributeChanged(this.props.uploadedFile, this.props.index);
    };

    isOpenAccess = (accessConditionId) => {
        return accessConditionId === OPEN_ACCESS_ID;
    };

    calculateFilesizeToDisplay = (size) => {
        const exponent = Math.floor(Math.log(size) / Math.log(sizeBase));
        return `${(size / Math.pow(sizeBase, exponent)).toFixed(1)}${Object.keys(sizeUnitText).map(key => (sizeUnitText[key]))[exponent]}`;
    };

    render() {
        const { deleteRecordConfirmation, filenameColumn, fileAccessColumn, embargoDateColumn, embargoDateClosedAccess } = this.props.locale;
        const { access_condition_id } = this.state;
        return (
            <div className="columns is-gapless is-multiline uploadedFileRow datalist datalist-row is-clearfix">
                <ConfirmDialogBox
                    onRef={ ref => (this.confirmationBox = ref) }
                    onAction={ this._deleteFile }
                    locale={ deleteRecordConfirmation } />
                <div className="column datalist-text file-info is-6-desktop is-5-tablet is-12-mobile">
                    <FontIcon className="material-icons mobile-icon is-hidden-desktop is-hidden-tablet">attachment</FontIcon>
                    <div className="file-name">
                        <span className="truncated">{ this.props.uploadedFile.name } ({this.calculateFilesizeToDisplay(this.props.uploadedFile.size )})</span>
                        <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{ filenameColumn }</span>
                    </div>
                </div>
                <div className="column datalist-text is-3-desktop is-4-tablet is-12-mobile">
                    {
                        this.props.requireFileAccess &&
                            <div className="file-access-selector">
                                <FontIcon className="material-icons mobile-icon is-hidden-desktop is-hidden-tablet">lock_outline</FontIcon>
                                <div className="select-container">
                                    <FileUploadAccessSelector onAccessChanged={ this._updateFileMetadata } disabled={ this.props.disabled } />
                                    <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{ fileAccessColumn }</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="column datalist-text is-2-desktop is-2-tablet is-three-quarters-mobile is-inline-block-mobile">
                    <div className="embargo-date-info">
                        <FontIcon className="material-icons mobile-icon is-hidden-desktop is-hidden-tablet">date_range</FontIcon>
                        {
                            this.props.requireFileAccess && !this.isOpenAccess(access_condition_id) &&
                            <div className="no-embargo-date">
                                <span>{embargoDateClosedAccess}</span>
                                <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{ embargoDateColumn }</span>
                            </div>
                        }
                        {
                            this.props.requireFileAccess && this.isOpenAccess(access_condition_id) &&
                            <div className="embargo-date-selector">
                                <FileUploadEmbargoDate onDateChanged={ this._updateFileMetadata } disabled={ this.props.disabled }/>
                                <span className="is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle">{ embargoDateColumn }</span>
                            </div>
                        }
                    </div>
                </div>
                {
                    this.props.progress === 0 &&
                        <div className="column is-narrow uploadedFileDelete datalist-buttons is-1-desktop is-1-tablet is-marginless">
                            <IconButton tooltip={ this.props.locale.deleteHint } onTouchTap={ this._showConfirmation } disabled={ this.props.disabled }>
                                <FontIcon className="material-icons deleteIcon">delete</FontIcon>
                            </IconButton>
                        </div>
                }
                {
                    this.props.progress > 0 && this.props.progress !== 100 &&
                        <div className="upload-progress-wrapper">
                            <CircularProgress
                                className="upload-progress"
                                mode="determinate"
                                value={ this.props.progress }
                                size={ 20 }
                                thickness={ 4 }
                            />
                        </div>
                }
                {
                    this.props.progress === 100 &&
                        <FontIcon className="material-icons green-tick">done</FontIcon>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.get('fileUpload')[ownProps.uploadedFile.name] || 0
    };
};

export default connect(mapStateToProps)(FileUploadRow);
