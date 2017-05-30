jest.dontMock('./DatePicker');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import DatePicker from './DatePicker';

function setup(props) {
    return shallow(<DatePicker {...props} />);
}

describe('DatePickerWrapper snapshots tests', () => {
    it('renders DatePicker component', () => {
        const props =
            {
                name: 'test',
                type: 'text',
                fullWidth: true,
                floatingLabelText: 'This is a test date picker component'
            };

        const app = setup(props);
        expect(toJson(app)).toMatchSnapshot();
    });
});
