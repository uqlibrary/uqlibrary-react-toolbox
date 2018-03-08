import FileUploadAccessSelector from './FileUploadAccessSelector';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps
    };

    return getElement(FileUploadAccessSelector, props, isShallow);
}

const locale = {
    initialValue: 'Select access conditions',
    accessSelectOptionsText: {
        1: 'Open Access',
        2: 'Closed Access'
    },
    errorMessage: 'This field is required'
};

const defaultConfig = {
    fileMetaKey: 'access_condition_id',
    fieldName: 'accessCondition',
    accessIds: [
        1,
        2
    ]
};

describe('Component FileUploadAccessSelector', () => {
    it('should render with default setup', () => {
        const onChangeTestFn = jest.fn();
        const props = {locale, defaultConfig, onChange: onChangeTestFn};
        const wrapper = setup({...props});
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._onChange({}, 0, 2);
        wrapper.update();

        expect(onChangeTestFn).toHaveBeenCalledWith(2);
    });

    it('should render with value', () => {
        const onChangeTestFn = jest.fn();
        const props = {locale, defaultConfig, onChange: onChangeTestFn, value: 1};
        const wrapper = setup({...props});
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._onChange({}, 0, 2);
        wrapper.update();

        expect(onChangeTestFn).toHaveBeenCalledWith(2);
    });

    it('should render access condition disabled if disabled flag is set', () => {
        const props = {locale, defaultConfig, disabled: true};
        const wrapper = setup({...props}, false);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render access condition disabled if disabled flag is set and with value', () => {
        const props = {locale, defaultConfig, disabled: true, value: 2};
        const wrapper = setup({...props}, false);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
