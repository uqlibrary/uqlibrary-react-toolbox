import {FileUploader} from './FileUploader';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps,
        clearFileUpload: jest.fn()
    };
    return getElement(FileUploader, props, isShallow);
}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('Component FileUploader', () => {
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
});
