jest.dontMock('./AutoCompleteSelect');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import AutoCompleteSelectWrapper from './AutoCompleteSelect';
import filterProps from '../../helpers/_filterProps';

function setup(props) {
    const consolidatedProps = filterProps(props, AutoCompleteSelectWrapper.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return shallow(<AutoCompleteSelectWrapper {...props} />);
}

describe('AutoCompleteSelectWrapper snapshots tests', () => {
    it('renders autocomplete field', () => {
        const props =
            {
                name: 'owner',
                label: 'Owner',
                disabled: false,
                filterItems: jest.fn(),
                labelField: 'name',
                value: {},
                errorText: '',
                meta: {
                    touched: null
                },
                input: {
                    onBlur: null
                }
            };

        const wrapper = setup(props);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
