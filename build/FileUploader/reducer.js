'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handlers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlers = (_handlers = {}, _defineProperty(_handlers, _actions.FILE_UPLOAD_PROGRESS + '@', function undefined(state, action) {
    var file = action.type.substring(action.type.indexOf('@') + 1, action.type.length);

    var uploadProgress = _extends({}, state, _defineProperty({}, '' + file, action.complete));

    delete uploadProgress.overall;

    return _extends({}, uploadProgress, {
        overall: Object.values(uploadProgress).reduce(function (sum, current) {
            return sum + current;
        }, 0) / Object.values(uploadProgress).length
    });
}), _defineProperty(_handlers, _actions.FILE_UPLOADED_FAILED + '@', function undefined(state, action) {
    var _extends3;

    var file = action.type.substring(action.type.indexOf('@') + 1, action.type.length);

    var uploadProgress = _extends({}, state);

    delete uploadProgress.overall;
    delete uploadProgress.file;

    return _extends({}, uploadProgress, (_extends3 = {}, _defineProperty(_extends3, '' + file, 'failed'), _defineProperty(_extends3, 'overall', Object.values(uploadProgress).reduce(function (sum, current) {
        return sum + current;
    }, 0) / Object.values(uploadProgress).length), _extends3));
}), _defineProperty(_handlers, _actions.FILE_UPLOAD_CLEARED, function () {
    return {
        overall: 0
    };
}), _handlers);

var fileUploadReducer = function fileUploadReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { overall: 0 };
    var action = arguments[1];

    var handler = action.type === _actions.FILE_UPLOAD_CLEARED ? handlers[action.type] : handlers[action.type.substring(0, action.type.indexOf('@') + 1)];

    if (!handler) {
        return state;
    }
    return handler(state, action);
};

exports.default = fileUploadReducer;