import FileUploadDropzone from './FileUploadDropzone';

const locale = {
    validation: {
        ['folder']: 'Invalid files ([filenames])',
        ['fileName']: 'File(s) ([filenames]) have invalid file name',
        ['maxFileSize']: 'File(s) ([filenames]) exceed maximum allowed upload file size',
        ['maxFiles']: 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) Files ([filenames]) will not be uploaded',
    },
    errorTitle: 'Upload Errors',
    fileUploadRestrictionHeading: 'Test header',
    fileUploadRestrictions: 'Test text',
    fileUploadInstruction: "Test instructions"
};

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps
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
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 3,
            uploadedFiles: [],
            clearErrors: false,
            locale: locale
        };
        const wrapper = setup({...props});

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render files discarding folders', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 5,
            uploadedFiles: [],
            clearErrors: false,
            locale: locale,
        };
        const wrapper = setup({...props});

        expect(toJson(wrapper)).toMatchSnapshot();

        const accepted = [
            {
                type: 'text/text',
                name: 'a.txt',
                size: 500
            },
            {
                type: 'text/text',
                name: 'a.text.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'ab.txt',
                size: 100
            },
            {
                type: '',
                name: 'test',
                size: 100
            },
            {
                type: 'text/text',
                name: 'web_a.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'WEB_b.txt',
                size: 100
            },
            {
                type: 'text/text',
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
