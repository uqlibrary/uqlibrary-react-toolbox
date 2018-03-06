import { FILE_UPLOAD_PROGRESS, FILE_UPLOADED_FAILED, FILE_UPLOAD_CLEARED } from './actions';

const getValues = (obj) => Object.keys(obj).map(key => obj[key]);

const handlers = {
    [`${FILE_UPLOAD_PROGRESS}@`]: (state, action) => {
        const file = action.type.substring(action.type.indexOf('@') + 1, action.type.length);

        const uploadProgress = {
            ...state,
            [`${file}`]: action.complete
        };

        delete uploadProgress.overall;

        return {
            ...uploadProgress,
            overall: getValues(uploadProgress).reduce((sum, current) => (sum + current), 0) / getValues(uploadProgress).length,
            uploadInProgress: true
        };
    },
    [`${FILE_UPLOADED_FAILED}@`]: (state, action) => {
        const file = action.type.substring(action.type.indexOf('@') + 1, action.type.length);

        const uploadProgress = {
            ...state
        };

        delete uploadProgress.overall;
        delete uploadProgress.file;

        return {
            ...uploadProgress,
            [`${file}`]: 0,
            overall: getValues(uploadProgress).reduce((sum, current) => (sum + current), 0) / getValues(uploadProgress).length
        };
    },
    [FILE_UPLOAD_CLEARED]: () => {
        return {
            overall: 0,
            uploadInProgress: false
        };
    }
};

const fileUploadReducer = (state = { overall: 0, uploadInProgress: false }, action) => {
    const handler = action.type === FILE_UPLOAD_CLEARED ? handlers[action.type] : handlers[action.type.substring(0, action.type.indexOf('@') + 1)];

    if (!handler) {
        return state;
    }
    return handler(state, action);
};

export default fileUploadReducer;
