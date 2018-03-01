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
        onDropped: jest.fn(),
        maxSize: 1000,
        maxFiles: 5,
        uploadedFiles: [],
        clearErrors: false,
        locale: locale,
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
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback
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

        wrapper.instance()._onDrop(accepted, [], event);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(onDroppedCallback).toHaveBeenCalled();
        wrapper.instance().componentWillReceiveProps({uploadedFiles: [

            {
                name: 'a.txt',
                size: 500
            },
            {
                name: 'ab.txt',
                size: 100
            }
        ]});
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set max file size error message for rejected files', () => {
        const wrapper = setup({});

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

        wrapper.instance()._onDrop(accepted, rejected, event);
        wrapper.update();
        expect(wrapper.state().errorMessage).toEqual('File(s) (b.txt) exceed maximum allowed upload file size');
    });

    it('should set max files error message', () => {
        const wrapper = setup({maxFiles: 3});
        wrapper.instance().componentWillReceiveProps({
            uploadedFiles: [
                {
                    name: 'a.txt',
                    size: 100
                },
                {
                    name: 'b.txt',
                    size: 100
                }
            ]
        });

        const accepted = [
            {
                name: 'c.txt',
                size: 500
            },
            {
                name: 'd.txt',
                size: 10000
            }
        ];

        const event = {
            dataTransfer: {
                items: []
            }
        };

        wrapper.instance()._onDrop(accepted, [], event);
        wrapper.update();
        expect(wrapper.state().errorMessage).toEqual('Maximum number of files (3) has been exceeded. File(s) (d.txt) will not be uploaded');
    });

    it('should open files selection dialog', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
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
