import {default as fileUploadReducer} from './reducer';
import { FILE_UPLOAD_PROGRESS, FILE_UPLOADED_FAILED, FILE_UPLOAD_CLEARED, FILE_UPLOAD_STARTED } from './actions';

describe('fileUploadReducer', () => {
    it('sets state correctly for file in progress', () => {
        const state = fileUploadReducer({overall: 0}, {type: `${FILE_UPLOAD_PROGRESS}@a.txt`, complete: 20});
        const expected = {
            'a.txt': 20,
            overall: 20,
            uploadInProgress: true
        };

        expect(state).toEqual(expected);
    });

    it('sets state correctly for multiple files in progress', () => {
        const state = fileUploadReducer({overall: 10, 'a.txt': 40}, {type: `${FILE_UPLOAD_PROGRESS}@b.txt`, complete: 60});
        const expected = {
            'a.txt': 40,
            'b.txt': 60,
            overall: 50,
            uploadInProgress: true
        };

        expect(state).toEqual(expected);
    });

    it('sets state correctly for file upload failed', () => {
        const state = fileUploadReducer({overall: 90, 'a.txt': 100, 'c.txt': 100}, {type: `${FILE_UPLOADED_FAILED}@b.txt`});
        const expected = {
            'a.txt': 100,
            'b.txt': 0,
            'c.txt': 100,
            overall: 100
        };

        expect(state).toEqual(expected);
    });

    it('sets state correctly for file upload failed', () => {
        const state = fileUploadReducer({overall: 90, 'a.txt': 100, 'c.txt': 100}, {type: FILE_UPLOAD_CLEARED});
        const expected = {
            overall: 0,
            uploadInProgress: false
        };

        expect(state).toEqual(expected);
    });

    it('sets state correctly for file upload started', () => {
        const state = fileUploadReducer({overall: 0, uploadInProgress: false}, {type: FILE_UPLOAD_STARTED});
        const expected = {
            uploadInProgress: true
        };

        expect(state).toEqual(expected);
    });
});
