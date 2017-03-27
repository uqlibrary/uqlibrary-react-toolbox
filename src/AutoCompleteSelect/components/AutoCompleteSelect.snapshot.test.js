jest.dontMock('./AutoCompleteSelect');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import AutoCompleteSelect from './AutoCompleteSelect';
import filterProps from '../../helpers/_filterProps';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function setup(props) {
    const consolidatedProps = filterProps(props, AutoCompleteSelect.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return shallow(<AutoCompleteSelect {...props} />, {context: { muiTheme: getMuiTheme()}});
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
