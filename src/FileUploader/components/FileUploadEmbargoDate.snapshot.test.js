jest.dontMock('./FileUploadEmbargoDate');

import React from 'react';
import FileUploadEmbargoDate from './FileUploadEmbargoDate';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps
    };

    return getElement(<FileUploadEmbargoDate {...props} />, isShallow);
}

describe('Component FileUploadEmbargoDate', () => {
    beforeEach(() => {
        // Set a mock date for account API
        const DATE_TO_USE = new Date('2016');
        const _Date = Date;
        global.Date = jest.fn(() => DATE_TO_USE);
        global.Date.UTC = _Date.UTC;
        global.Date.parse = _Date.parse;
        global.Date.now = _Date.now;
    });

    it('should render with default setup', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render disabled', () => {
        const wrapper = setup({disabled: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render datepicker on key pressed', () => {
        const wrapper = setup({}, false);
        expect (toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._onKeyPress();
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set correct date on date changed', () => {
        const onDateChangedTestFn = jest.fn();
        const props = {
            locale: {
                datePickerLocale: 'en-AU'
            },
            defaultConfig: {
                fileMetaKey: 'date',
                dateTimeFormat: global.Intl.DateTimeFormat,
                fieldName: 'accessDate'
            },
            onDateChanged: onDateChangedTestFn
        };

        const wrapper = setup({...props}, true);
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._onChange({}, 'Sat Feb 10 2018 00:00:00 GMT+1000 (AEST)');
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(onDateChangedTestFn).toHaveBeenCalled();
    });
});
