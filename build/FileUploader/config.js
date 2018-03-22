'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CLOSED_ACCESS_ID = exports.CLOSED_ACCESS_ID = 8;
var OPEN_ACCESS_ID = exports.OPEN_ACCESS_ID = 9;
var SIZE_BASE = exports.SIZE_BASE = 1000;

var DEFAULT_FILE_UPLOAD_LIMIT = exports.DEFAULT_FILE_UPLOAD_LIMIT = 10;
var DEFAULT_MAX_FILE_SIZE = exports.DEFAULT_MAX_FILE_SIZE = 5;

var SIZE_UNIT_B = exports.SIZE_UNIT_B = 'B';
var SIZE_UNIT_K = exports.SIZE_UNIT_K = 'K';
var SIZE_UNIT_M = exports.SIZE_UNIT_M = 'M';
var SIZE_UNIT_G = exports.SIZE_UNIT_G = 'G';

var FILE_META_KEY_ACCESS_CONDITION = exports.FILE_META_KEY_ACCESS_CONDITION = 'access_condition_id';
var FILE_META_KEY_EMBARGO_DATE = exports.FILE_META_KEY_EMBARGO_DATE = 'date';

var SIZE_UNITS = exports.SIZE_UNITS = [SIZE_UNIT_B, SIZE_UNIT_K, SIZE_UNIT_M, SIZE_UNIT_G];

var fileRestrictionsConfig = exports.fileRestrictionsConfig = {
    fileUploadLimit: DEFAULT_FILE_UPLOAD_LIMIT,
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    fileSizeUnit: SIZE_UNIT_G,
    fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
};

var accessSelector = exports.accessSelector = {
    fieldName: 'accessCondition',
    accessIds: [OPEN_ACCESS_ID, CLOSED_ACCESS_ID]
};

var embargoDate = exports.embargoDate = {
    fieldName: 'accessDate',
    dateTimeFormat: global.Intl.DateTimeFormat
};