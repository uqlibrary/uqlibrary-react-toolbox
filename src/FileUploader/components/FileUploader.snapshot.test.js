import React from 'react';
import {FileUploader} from './FileUploader';

const locale = {
    instructions: 'You may add up to [fileUploadLimit] files (max [maxFileSize][fileSizeUnit] each)',
    accessTermsAndConditions: 'I understand that the files indicated above as open access will be submitted as open access and will be made publicly available immediately or will be made available on the indicated embargo date.  All other files submitted will be accessible by UQ eSpace administrators.',
    validation: {
        ['folder']: 'Invalid files ([filenames])',
        ['fileName']: 'File(s) ([filenames]) have invalid file name',
        ['maxFileSize']: 'File(s) ([filenames]) exceed maximum allowed upload file size',
        ['maxFiles']: 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) ([filenames]) will not be uploaded',
        ['duplicateFiles']: 'File(s) ([filenames]) are duplicate and have been ignored'
    },
    errorTitle: 'Upload Errors',
    successTitle: 'Success',
    successMessage: 'Successfully added [numberOfFiles] file(s) to upload queue.',
    fileUploadRestrictionHeading: (<h3>File upload restrictions</h3>),
    fileUploadRestrictions: (
        <div>
            Please ensure your files:
            <ul>
                <li>begin with a letter and are less than 45 characters long</li>
                <li>contain only upper and lowercase alphanumeric characters, and underscores</li>
                <li>have only a single period which precedes the file extension: “.pdf”</li>
                <li>are uploaded individually and not inside a folder</li>
            </ul>
        </div>
    ),
    fileUploadInstruction: (
        <p>Click here to select files, or drag files into this area to upload</p>
    )
};

function setup(testProps, isShallow = true) {
    const props = {
        fileRestrictionsConfig: {
            fileUploadLimit: 5,
            maxFileSize: 1,
            fileSizeUnit: 'K',
            fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
        },
        filesInQueue: [],
        clearFileUpload: jest.fn(),
        locale: locale,
        ...testProps
    };
    return getElement(FileUploader, props, isShallow);
}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('Component FileUploader', () => {
    let FILE_TO_USE;
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
        FILE_TO_USE = (name) => ({fileData: new File([''], name), name: name, size: 0});
    });

    it('should render correctly without any setup', () => {
        const wrapper = setup({});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('should render rows for uploaded files', () => {
        const wrapper = setup({});

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const files = [FILE_TO_USE('a.txt'), FILE_TO_USE('b.txt')];

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

        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
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

        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const files = [file_a, file_b];

        wrapper.instance()._handleDroppedFiles(files, {});
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with access condition dropdown based on quick template Id and require open access', () => {
        const wrapper = setup({ defaultQuickTemplateId: 3, requireOpenAccessStatus: true });

        expect(toJson(wrapper)).toMatchSnapshot();

        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const files = [file_a, file_b];

        wrapper.instance()._handleDroppedFiles(files, {});
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set max files error message', () => {
        const wrapper = setup({fileRestrictionsConfig: {fileUploadLimit: 3}});

        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const file_c = FILE_TO_USE('c.txt');

        const accepted = [file_a, file_b, file_c];

        wrapper.instance()._handleDroppedFiles(accepted, {maxFiles: ['d.txt']});
        wrapper.update();
        expect(wrapper.state().errorMessage).toEqual('Maximum number of files (3) has been exceeded. File(s) (d.txt) will not be uploaded');
    });

    it('should not reset file access or embargo date info when second lot of files dropped', () => {
        const wrapper = setup({});

        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const file_c = FILE_TO_USE('c.txt');
        const file_d = FILE_TO_USE('d.txt');


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

        const file_a = FILE_TO_USE('a.txt');

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

        const file_a = FILE_TO_USE('a.txt');
        file_a.access_condition_id = 8;
        const file_b = FILE_TO_USE('b.txt');
        file_b.access_condition_id = 9;
        file_b.date = '2017-01-01';
        const file_c = FILE_TO_USE('c.txt');
        file_c.access_condition_id = 8;
        const file_d = FILE_TO_USE('d.txt');
        file_d.access_condition_id = 8;

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        wrapper.state().isTermsAndConditionsAccepted = false;
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeFalsy();
    });

    it('should return true on if all files are closed access', () => {
        const wrapper = setup({requireOpenAccessStatus: true});

        const file_a = FILE_TO_USE('a.txt');
        file_a.access_condition_id = 8;
        const file_b = FILE_TO_USE('b.txt');
        file_b.access_condition_id = 8;
        const file_c = FILE_TO_USE('c.txt');
        file_c.access_condition_id = 8;
        const file_d = FILE_TO_USE('d.txt');
        file_d.access_condition_id = 8;

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        wrapper.state().isTermsAndConditionsAccepted = false;
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeTruthy();
    });

    it('should return true on if any file is open access with date selected and terms and conditions accepted', () => {
        const wrapper = setup({requireOpenAccessStatus: true});

        const file_a = FILE_TO_USE('a.txt');
        file_a.access_condition_id = 8;
        const file_b = FILE_TO_USE('b.txt');
        file_b.access_condition_id = 9;
        file_b.date = '2017-01-01';
        const file_c = FILE_TO_USE('c.txt');
        file_c.access_condition_id = 8;
        const file_d = FILE_TO_USE('d.txt');
        file_d.access_condition_id = 8;

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        wrapper.state().isTermsAndConditionsAccepted = true;
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeTruthy();
    });

    it('should return false on if access condition is not selected for any files', () => {
        const wrapper = setup({requireOpenAccessStatus: true, isTermsAndConditionsAccepted: false});

        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const file_c = FILE_TO_USE('c.txt');
        const file_d = FILE_TO_USE('d.txt');

        wrapper.state().filesInQueue = [file_a, file_b, file_c, file_d];
        expect(wrapper.instance().isFileUploadValid(wrapper.state())).toBeFalsy();
    });

    it('should get correct error message based on errors object', () => {
        const wrapper = setup({});

        expect(wrapper.instance().getErrorMessage({
            maxFiles: ['a.txt', 'b.txt'],
            duplicateFiles: ['c.txt', 'd.txt'],
            fileName: ['web_a.txt'],
            folder: ['someFolder'],
            maxFileSize: ['big_file.txt']
        })).toEqual('Maximum number of files (5) has been exceeded. File(s) (a.txt, b.txt) will not be uploaded; File(s) (c.txt, d.txt) are duplicate and have been ignored; File(s) (web_a.txt) have invalid file name; Invalid files (someFolder); File(s) (big_file.txt) exceed maximum allowed upload file size');
    })
});
