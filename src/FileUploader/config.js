import * as constants from './constants';

export const fileRestrictionsConfig = {
    fileUploadLimit: constants.DEFAULT_FILE_UPLOAD_LIMIT,
    maxFileSize: constants.DEFAULT_MAX_FILE_SIZE,
    fileSizeUnit: constants.SIZE_UNIT_G,
    fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
};

export const accessSelector = {
    fieldName: 'accessCondition',
    accessIds: [
        constants.OPEN_ACCESS_ID,
        constants.CLOSED_ACCESS_ID
    ]
};

export const embargoDate = {
    fieldName: 'accessDate',
    dateTimeFormat: global.Intl.DateTimeFormat
};
