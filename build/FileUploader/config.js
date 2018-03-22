'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.embargoDate = exports.accessSelector = exports.fileRestrictionsConfig = undefined;

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fileRestrictionsConfig = exports.fileRestrictionsConfig = {
    fileUploadLimit: constants.DEFAULT_FILE_UPLOAD_LIMIT,
    maxFileSize: constants.DEFAULT_MAX_FILE_SIZE,
    fileSizeUnit: constants.SIZE_UNIT_G,
    fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
};

var accessSelector = exports.accessSelector = {
    fieldName: 'accessCondition',
    accessIds: [constants.OPEN_ACCESS_ID, constants.CLOSED_ACCESS_ID]
};

var embargoDate = exports.embargoDate = {
    fieldName: 'accessDate',
    dateTimeFormat: global.Intl.DateTimeFormat
};