import { FILE_UPLOAD_PROGRESS, FILE_UPLOADED_FAILED, FILE_UPLOAD_CLEARED, FILE_UPLOAD_STARTED } from './actions';

const handlers = {
    [`${FILE_UPLOAD_STARTED}`]: (state) => {
        return {
            ...state,
            uploadInProgress: true
        };
    },
    [`${FILE_UPLOAD_PROGRESS}@`]: (state, action) => {
        const file = action.type.substring(action.type.indexOf('@') + 1, action.type.length);

        const uploadProgress = {
            ...state,
            [`${file}`]: action.complete
        };

        return {
            ...uploadProgress,
            uploadInProgress: true
        };
    },
    [`${FILE_UPLOADED_FAILED}@`]: (state, action) => {
        const file = action.type.substring(action.type.indexOf('@') + 1, action.type.length);

        const uploadProgress = {
            ...state
        };

        delete uploadProgress.file;

        return {
            ...uploadProgress,
            [`${file}`]: 0
        };
    },
    [FILE_UPLOAD_CLEARED]: () => {
        return {
            uploadInProgress: false
        };
    }
};

const fileUploadReducer = (state = { uploadInProgress: false }, action) => {
    const handler = action.type === FILE_UPLOAD_CLEARED ? handlers[action.type] : handlers[action.type.substring(0, action.type.indexOf('@') + 1)];

    if (!handler) {
        return state;
    }
    return handler(state, action);
};

export default fileUploadReducer;
