import FileUploadDropzone from './FileUploadDropzone';

const locale = {
    validation: {
        ['folder']: 'Invalid files ([filenames])',
        ['fileName']: 'File(s) ([filenames]) have invalid file name',
        ['maxFileSize']: 'File(s) ([filenames]) exceed maximum allowed upload file size',
        ['maxFiles']: 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) ([filenames]) will not be uploaded',
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
    beforeEach(() => {
        const FILE_READER_TO_USE = new FileReader();
        window.FileReader = jest.fn(() => FILE_READER_TO_USE);
        window.FileReader.onerror = () => resolve();
        window.FileReader.onload = () => resolve();
        window.FileReader.readAsDataURL = () => (window.FileReader.onload);
    });

    it('should render correctly without any setup', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render files discarding folders', () => {
        const onDropCallback = jest.fn();
        const props = {
            onDrop: onDropCallback
        };
        const wrapper = setup({...props});

        expect(toJson(wrapper)).toMatchSnapshot();

        const accepted = [
            {
                name: 'a.txt',
                size: 500
            },
            {
                name: 'a.text.txt',
                size: 100
            },
            {
                name: 'ab.txt',
                size: 100
            },
            {
                name: 'test',
                size: 100
            },
            {
                name: 'web_a.txt',
                size: 100
            },
            {
                name: 'WEB_b.txt',
                size: 100
            },
            {
                name: 'Web_c.txt',
                size: 100
            }
        ];

        const event = {
            dataTransfer: {
                items: [
                    {
                        webkitGetAsEntry: () => ({
                            name: 'test',
                            isDirectory: true
                        })
                    }
                ]
            }
        };

        const filtered = [
            {
                name: 'a.txt',
                size: 500
            },
            {
                name: 'ab.txt',
                size: 100
            }
        ];

        const expectedErrors = new Map([]);
        expectedErrors.set('maxFileSize', []);
        expectedErrors.set('folder', ['test']);
        expectedErrors.set('fileName', ['a.text.txt', 'web_a.txt', 'WEB_b.txt', 'Web_c.txt']);

        wrapper.instance()._onDrop(accepted, [], event);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(onDropCallback).toHaveBeenCalledWith(filtered, expectedErrors);
    });

    it('should set max file size error message for rejected files', () => {
        const onDropCallback = jest.fn();
        const props = {
            onDrop: onDropCallback
        };
        const wrapper = setup({...props});

        const accepted = [
            {
                name: 'a.txt',
                size: 500
            }
        ];

        const rejected = [
            {
                name: 'b.txt',
                size: 10000
            }
        ];

        const event = {
            dataTransfer: {
                items: []
            }
        };

        const expectedErrors = new Map([]);
        expectedErrors.set('maxFileSize', ['b.txt']);
        expectedErrors.set('folder', []);
        expectedErrors.set('fileName', []);

        wrapper.instance()._onDrop(accepted, rejected, event);
        wrapper.update();
        expect(onDropCallback).toHaveBeenCalledWith(accepted, expectedErrors);
    });

    it('should open files selection dialog', () => {
        const onDropCallback = jest.fn();
        const props = {
            onDrop: onDropCallback,
            maxSize: 1000,
            maxFiles: 5,
            uploadedFiles: [],
            clearErrors: false,
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
});
