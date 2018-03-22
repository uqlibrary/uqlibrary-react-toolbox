import FileUploadDropzone from './FileUploadDropzone';

const locale = {
    validation: {
        ['folder']: 'Invalid files ([fileNames])',
        ['fileName']: 'File(s) ([fileNames]) have invalid file name',
        ['maxFileSize']: 'File(s) ([fileNames]) exceed maximum allowed upload file size',
        ['tooManyFiles']: 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) ([fileNames]) will not be uploaded',
    },
    successTitle: 'Success',
    successMessage: 'Successfully added [numberOfFiles] file(s) to upload queue.',
    errorTitle: 'Upload Errors',
    fileUploadRestrictionHeading: 'Test header',
    fileUploadRestrictions: 'Test text',
    fileUploadInstruction: "Test instructions"
};

function setup(testProps, isShallow = true) {
    const props = {
        onDrop: jest.fn(),
        maxSize: 1000,
        locale: locale,
        fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/,
        ...testProps,
    };
    return getElement(FileUploadDropzone, props, isShallow);
}

describe('Component FileUploadDropzone', () => {
    let FILE_TO_USE;

    beforeEach(() => {
        const _File = window.File;
        const FILE = (data = [''], name) => new _File(data, name, {lastModified: 12345678912});
        window.File = jest.fn((data, name) => FILE(data, name));
        FILE_TO_USE = (name) => new File([''], name);
    });

    it('should render correctly without any setup', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('removeDroppedFolders should filter folders out from the file list', async () => {
        const wrapper = setup({});

        const file_a = FILE_TO_USE('a.txt');
        file_a.slice = (x, y) => true;
        const file_b = FILE_TO_USE('droppedFolder');
        file_b.slice = (x, y) => false;
        const file_c = FILE_TO_USE('c.txt');
        file_c.slice = (x, y) => true;

        const accepted = [file_a, file_b, file_c];
        const errors = {
            folders: []
        };

        wrapper.instance().readFile = jest.fn((file, errors, resolve) => {
            file.slice() ? resolve(file) : resolve(false);
        });

        await expect(wrapper.instance().removeDroppedFolders(accepted, errors)).resolves.toEqual([file_a, false, file_c]);
    });

    it('should set max file size error message for rejected files', async () => {
        const onDropCallback = jest.fn();
        const props = {
            onDrop: onDropCallback,
            filesInQueue: [],
            fileUploadLimit: 5
        };

        const wrapper = setup({...props});
        wrapper.instance().removeDroppedFolders = jest.fn((accepted, {}) => {
            return Promise.resolve(accepted);
        });

        const file_a = FILE_TO_USE('a.txt');
        const accepted = [file_a];

        const expectedAccepted = accepted.map(file => ({fileData: file, name: file.name, size: file.size}));

        const file_b = FILE_TO_USE('b.txt');
        const rejected = [file_b];

        await wrapper.instance()._onDrop(accepted, rejected);
        expect(onDropCallback).toHaveBeenCalledWith(expectedAccepted, {maxFileSize: ['b.txt'], folder: [], fileName: [], duplicateFiles: [], tooManyFiles: []});
    });

    it('should open files selection dialog', () => {
        const onDropCallback = jest.fn();
        const props = {
            onDrop: onDropCallback,
            maxSize: 1000,
            fileUploadLimit: 5,
            filesInQueue: [],
            locale: locale
        };
        const wrapper = setup({...props}, false);

        expect(toJson(wrapper)).toMatchSnapshot();

        const testFn = jest.fn();

        wrapper.find('FileUploadDropzone').instance().dropzoneRef.open = testFn;
        wrapper.find('FileUploadDropzone').instance()._onKeyPress();

        wrapper.update();
        expect(testFn).toHaveBeenCalled();
    });

    it('should remove duplicate files', () => {
        const wrapper = setup({});

        const file_c = FILE_TO_USE('c.txt');
        const file_d = FILE_TO_USE('d.txt');

        const accepted = [file_c, file_d];
        const {uniqueFiles, duplicateFiles} = wrapper.instance().removeDuplicate(accepted, ['a.txt', 'b.txt', 'c.txt']);
        expect(uniqueFiles).toEqual([file_d]);
        expect(duplicateFiles).toEqual(['c.txt']);
    });

    it('should set max files error message', async () => {
        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const file_c = FILE_TO_USE('c.txt');
        const file_d = FILE_TO_USE('d.txt');
        const onDropTestFn = jest.fn();

        const wrapper = setup({
            fileUploadLimit: 3,
            filesInQueue: [file_a.name, file_b.name],
            onDrop: onDropTestFn
        });

        const accepted = [file_c, file_d];
        wrapper.instance().removeDroppedFolders = jest.fn((accepted, {}) => new Promise(resolve => resolve(accepted)));
        const expectedAccepted = [{fileData: file_c, name: file_c.name, size: file_c.size}];

        await wrapper.instance()._onDrop(accepted, []);
        wrapper.update();
        expect(onDropTestFn).toHaveBeenCalledWith(expectedAccepted, {tooManyFiles: ['d.txt'], maxFileSize: [], duplicateFiles: [], folder: [], fileName: []});
    });

    it('should set all error messages', async () => {
        const file_a = FILE_TO_USE('a.txt');
        const file_b = FILE_TO_USE('b.txt');
        const file_b_dup = FILE_TO_USE('b.txt');
        const file_c = FILE_TO_USE('c.txt');
        const file_d = FILE_TO_USE('web_d.txt');
        const file_e = FILE_TO_USE('e.txt');
        const file_f = FILE_TO_USE('f.txt');
        const file_g = FILE_TO_USE('g.txt');
        const onDropTestFn = jest.fn();

        const wrapper = setup({
            fileUploadLimit: 4,
            filesInQueue: [file_a.name, file_b.name],
            onDrop: onDropTestFn
        });

        const accepted = [file_b_dup, file_c, file_d, file_f, file_g];
        wrapper.instance().removeDroppedFolders = jest.fn((accepted, {}) => new Promise(resolve => resolve([file_b_dup, file_c, file_d, file_f, file_g])));
        const expectedAccepted = [file_c, file_f].map(file => ({fileData: file, name: file.name, size: file.size}));

        await wrapper.instance()._onDrop(accepted, [file_e]);
        wrapper.update();
        expect(onDropTestFn).toHaveBeenCalledWith(expectedAccepted, {tooManyFiles: ['g.txt'], maxFileSize: ['e.txt'], duplicateFiles: ['b.txt'], folder: [], fileName: ['web_d.txt']});
    });
});
