import {FileUploader} from './FileUploader';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps,
        maxFiles: 5,
        filesInQueue: [],
        clearFileUpload: jest.fn()
    };
    return getElement(FileUploader, props, isShallow);
}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('Component FileUploader', () => {
    beforeEach(() => {
        const FILE_READER_TO_USE = new FileReader();
        window.FileReader = jest.fn(() => FILE_READER_TO_USE);
        window.FileReader.onerror = () => resolve();
        window.FileReader.onload = () => resolve();
        window.FileReader.readAsDataURL = () => (window.FileReader.onload);
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

        const files = [
            {
                name: 'a.txt',
                size: 100
            },
            {
                name: 'b.txt',
                size: 100
            }
        ];

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._deleteFile({}, 0);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._deleteAllFiles();
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with access required', () => {
        const wrapper = setup({ requireOpenAccessStatus: true });

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const files = [
            {
                name: 'a.txt',
                size: 100
            },
            {
                name: 'b.txt',
                size: 100
            }
        ];

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._replaceFile({ name: 'a.txt', size: 100, access_condition_id: 8 }, 0);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._replaceFile({ name: 'a.txt', size: 100, access_condition_id: 9 }, 0);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._replaceFile({ name: 'a.txt', size: 100, access_condition_id: 9, date: '10/10/2017' }, 0);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with default access condition based on quick template Id', () => {
        const wrapper = setup({ defaultQuickTemplateId: 3 });

        expect(toJson(wrapper)).toMatchSnapshot();

        const files = [
            {
                name: 'a.txt',
                size: 100
            },
            {
                name: 'b.txt',
                size: 100
            }
        ];

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render rows for uploaded files with default access condition based on quick template Id', () => {
        const wrapper = setup({ defaultQuickTemplateId: 3, requireOpenAccessStatus: true });

        expect(toJson(wrapper)).toMatchSnapshot();

        const files = [
            {
                name: 'a.txt',
                size: 100
            },
            {
                name: 'b.txt',
                size: 100
            }
        ];

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
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
});
