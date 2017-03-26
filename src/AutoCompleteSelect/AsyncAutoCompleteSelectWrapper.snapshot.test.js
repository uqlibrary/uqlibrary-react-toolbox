jest.dontMock('./AsyncAutoCompleteSelect');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import AsyncAutoCompleteSelectWrapper from './AsyncAutoCompleteSelect';
import filterProps from './_filterProps';

function setup(props) {
    const consolidatedProps = filterProps(props, AsyncAutoCompleteSelectWrapper.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return shallow(<AsyncAutoCompleteSelectWrapper {...props} />);
}

describe('AsyncAutoCompleteSelectWrapper snapshots tests', () => {
    it('renders asyncautocomplete field', () => {
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
