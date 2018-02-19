'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FILE_UPLOAD_PROGRESS = exports.FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
var FILE_UPLOADED_FAILED = exports.FILE_UPLOADED_FAILED = 'FILE_UPLOADED_FAILED';
var FILE_UPLOAD_CLEARED = exports.FILE_UPLOAD_CLEARED = 'FILE_UPLOAD_CLEARED';

/**
 * Notify progress for individual file
 *
 * @param name
 * @param progress
 * @returns {{type: string, complete: *}}
 */
var notifyProgress = exports.notifyProgress = function notifyProgress(name, progress) {
    return {
        type: FILE_UPLOAD_PROGRESS + '@' + name,
        complete: progress
    };
};

var notifyFileUploadProgress = exports.notifyFileUploadProgress = function notifyFileUploadProgress(name, dispatch) {
    return function (event) {
        var progress = Math.floor(event.loaded * 100 / event.total);
        dispatch(notifyProgress(name, progress));
    };
};

/**
 * Notify file upload failed for individual file
 *
 * @param name
 * @returns {{type: string}}
 */
var notifyUploadFailed = exports.notifyUploadFailed = function notifyUploadFailed(name) {
    return {
        type: FILE_UPLOADED_FAILED + '@' + name
    };
};

/**
 * Clear file upload state
 *
 * @returns {{type: string}}
 */
var clearFileUpload = exports.clearFileUpload = function clearFileUpload() {
    return {
        type: FILE_UPLOAD_CLEARED
    };
};