jest.dontMock('./SelectField');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import SelectField from './SelectField';

import filterProps from '../../helpers/_filterProps';

function setup(props) {
    const consolidatedProps = filterProps(props, SelectField.propTypes);
    return shallow(<SelectField {...consolidatedProps} />);
}

describe('TextFieldWrapper snapshots tests', () => {
    it('renders TextField component', () => {
        const props =
            {
                name: 'testField',
                type: 'text',
                fullWidth: true,
                floatingLabelText: 'This is a test textfield component'
            };

        const wrapper = setup(props);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
