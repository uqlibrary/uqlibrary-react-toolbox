jest.dontMock('./PartialDateForm');

import React from 'react';
import {shallow} from 'enzyme';
import PartialDateForm from './PartialDateForm';

function setup(props) {
    return shallow(<PartialDateForm {...props} />);
}

describe('PartialDateForm unit tests', () => {
    it('should return correct formatted date 1', () => {
        const props = {
            allowPartial: true,
            onChange: (value) => (expect(value).toBe('2015-01-01'))
        };

        const form = setup(props);
        form.instance()._onDateChanged('year')({ target: { value: '2015' }});
    });

    it('should return correct formatted date 2', () => {
        const expectToBe = (value) => {
            expect(value).toBe(['', '', '', '', '', '20/09/2016'].shift());
            return expectToBe;
        };

        const props = {
            allowPartial: false,
            dateFormat: 'DD/MM/YYYY',
            onChange: (value) => (expectToBe)
        };

        const form = setup(props);
        form.instance()._onDateChanged('day')({ target: { value: NaN }});
        form.instance()._onDateChanged('day')({ target: { value: '20' }});
        form.instance()._onDateChanged('month')({ target: { value: undefined }}, 0, -1);
        form.instance()._onDateChanged('month')({ target: { value: undefined }}, 9, 8);
        form.instance()._onDateChanged('year')({ target: { value: NaN }});
        form.instance()._onDateChanged('year')({ target: { value: '2016' }});
    });
});
