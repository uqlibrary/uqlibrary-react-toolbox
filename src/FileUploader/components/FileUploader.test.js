import React from 'react';
import {FileUploader} from './FileUploader';

function setup(testProps, isShallow = true) {
    const props = {
        fileRestrictionsConfig: {
            fileUploadLimit: 5,
            maxFileSize: 1,
            fileSizeUnit: 'K',
            fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
        },
        filesInQueue: [],
        // locale: locale,
        ...testProps
    };
    return getElement(FileUploader, props, isShallow);
}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('Component FileUploader', () => {
    let getMockFile;
    beforeEach(() => {
        // Set a mock date for account API
        const DATE_TO_USE = new Date('2016');
        const _Date = Date;
        global.Date = jest.fn(() => DATE_TO_USE);
        global.Date.UTC = _Date.UTC;
        global.Date.parse = _Date.parse;
        global.Date.now = _Date.now;

        const _File = window.File;
        const FILE = (data = [''], name) => new _File(data, name, {lastModified: 12345678912});
        window.File = jest.fn((data, name) => FILE(data, name));
        getMockFile = (name) => ({fileData: new File([''], name), name: name, size: 0});
    });

    it('should render default component', () => {
        const wrapper = setup({});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('should render disabled component', () => {
        const wrapper = setup({disabled: true}, true);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('should render rows for uploaded files', () => {
        const wrapper = setup({});

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const files = [getMockFile('a.txt'), getMockFile('b.txt')];

        wrapper.instance()._handleDroppedFiles(files, {});
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._deleteFile({}, 0);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.instance().state.isTermsAndConditionsAccepted).toBeFalsy();

        wrapper.instance()._deleteAllFiles();
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with access required', () => {
        const wrapper = setup({ requireOpenAccessStatus: true });

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const file_a = getMockFile('a.txt');
        const file_b = getMockFile('b.txt');
        const files = [file_a, file_b];

        wrapper.instance()._handleDroppedFiles(files, {});
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._updateFileAccessCondition(file_a, 0, 8);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._updateFileAccessCondition(file_a, 0, 9);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        file_a.access_condition_id = 9;
        wrapper.instance()._updateFileEmbargoDate(file_a, 0, '10/10/2017');
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with default access condition based on quick template Id', () => {
        const wrapper = setup({ defaultQuickTemplateId: 3 });

        expect(toJson(wrapper)).toMatchSnapshot();

        const file_a = getMockFile('a.txt');
        const file_b = getMockFile('b.txt');
        const files = [file_a, file_b];

        wrapper.instance()._handleDroppedFiles(files, {});
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with access condition dropdown based on quick template Id and require open access', () => {
        const wrapper = setup({ defaultQuickTemplateId: 3, requireOpenAccessStatus: true });

        expect(toJson(wrapper)).toMatchSnapshot();

        const file_a = getMockFile('a.txt');
        const file_b = getMockFile('b.txt');
        const files = [file_a, file_b];

        wrapper.instance()._handleDroppedFiles(files, {});
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set max files error message', () => {
        const wrapper = setup({fileRestrictionsConfig: {fileUploadLimit: 3}});

        const file_a = getMockFile('a.txt');
        const file_b = getMockFile('b.txt');
        const file_c = getMockFile('c.txt');

        const accepted = [file_a, file_b, file_c];

        wrapper.instance()._handleDroppedFiles(accepted, {tooManyFiles: ['d.txt']});
        wrapper.update();
        expect(wrapper.state().errorMessage).toEqual('Maximum number of files (3) has been exceeded. File(s) (d.txt) will not be uploaded');
    });

    it('should not reset file access or embargo date info when second lot of files dropped', () => {
        const wrapper = setup({});

        const file_a = getMockFile('a.txt');
        const file_b = getMockFile('b.txt');
        const file_c = getMockFile('c.txt');
        const file_d = getMockFile('d.txt');


        wrapper.instance()._handleDroppedFiles([file_a, file_b], {});
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._updateFileAccessCondition(file_a, 0, 9);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._updateFileAccessCondition(file_b, 1, 8);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._handleDroppedFiles([file_c, file_d], {});
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should accept terms and condition and reset back to not accepted state if access condition changed back to closed access', () => {
        const wrapper = setup({requireOpenAccessStatus: true});

        const file_a = getMockFile('a.txt');

        wrapper.instance()._handleDroppedFiles([file_a], {});
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._updateFileAccessCondition(file_a, 0, 9);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._acceptTermsAndConditions({}, true);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        expect(wrapper.state().isTermsAndConditionsAccepted).toBeTruthy();

        wrapper.instance()._updateFileAccessCondition(file_a, 0, 8);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();

        expect(wrapper.state().isTermsAndConditionsAccepted).toBeFalsy();
    });

    it('should return false if any file has open access with date selected but terms and conditions not accepted', () => {
        const wrapper = setup({requireOpenAccessStatus: true});

        const file_a = getMockFile('a.txt');
        file_a.access_condition_id = 8;
        const file_b = getMockFile('b.txt');
        file_b.access_condition_id = 9;
        file_b.date = '2017-01-01';
        const file_c = getMockFile('c.txt');
        file_c.access_condition_id = 8;
        const file_d = getMockFile('d.txt');
        file_d.access_condition_id = 8;

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        wrapper.state().isTermsAndConditionsAccepted = false;
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeFalsy();
    });

    it('should return true on if all files are closed access', () => {
        const wrapper = setup({requireOpenAccessStatus: true});

        const file_a = getMockFile('a.txt');
        file_a.access_condition_id = 8;
        const file_b = getMockFile('b.txt');
        file_b.access_condition_id = 8;
        const file_c = getMockFile('c.txt');
        file_c.access_condition_id = 8;
        const file_d = getMockFile('d.txt');
        file_d.access_condition_id = 8;

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        wrapper.state().isTermsAndConditionsAccepted = false;
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeTruthy();
    });

    it('should return true on if any file is open access with date selected and terms and conditions accepted', () => {
        const wrapper = setup({requireOpenAccessStatus: true});

        const file_a = getMockFile('a.txt');
        file_a.access_condition_id = 8;
        const file_b = getMockFile('b.txt');
        file_b.access_condition_id = 9;
        file_b.date = '2017-01-01';
        const file_c = getMockFile('c.txt');
        file_c.access_condition_id = 8;
        const file_d = getMockFile('d.txt');
        file_d.access_condition_id = 8;

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        wrapper.state().isTermsAndConditionsAccepted = true;
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeTruthy();
    });

    it('should return false on if access condition is not selected for any files', () => {
        const wrapper = setup({requireOpenAccessStatus: true, isTermsAndConditionsAccepted: false});

        const file_a = getMockFile('a.txt');
        const file_b = getMockFile('b.txt');
        const file_c = getMockFile('c.txt');
        const file_d = getMockFile('d.txt');

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeFalsy();
    });

    it('should get correct error message based on errors object', () => {
        const wrapper = setup({});

        expect(wrapper.instance().getErrorMessage({
            tooManyFiles: ['a.txt', 'b.txt'],
            duplicateFiles: ['c.txt', 'd.txt'],
            invalidFileNames: ['web_a.txt'],
            notFiles: ['someFolder'],
            tooBigFiles: ['big_file.txt']
        })).toEqual('Maximum number of files (5) has been exceeded. File(s) (a.txt, b.txt) will not be uploaded; File(s) (c.txt, d.txt) are duplicates and have been ignored; File(s) (web_a.txt) have invalid file name; Invalid files (someFolder); File(s) (big_file.txt) exceed maximum allowed upload file size');
    })
});
