jest.dontMock('./AsyncAutoCompleteSelect');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import AsyncAutoCompleteSelect from './AsyncAutoCompleteSelect';
import filterProps from '../../helpers/_filterProps';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function setup(props) {
    const consolidatedProps = filterProps(props, AsyncAutoCompleteSelect.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return shallow(<AsyncAutoCompleteSelect {...props} />, {context: { muiTheme: getMuiTheme()}});
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
