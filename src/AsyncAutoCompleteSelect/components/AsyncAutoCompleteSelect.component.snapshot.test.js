jest.dontMock('./AsyncAutoCompleteSelect.component');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AsyncAutoCompleteSelect from './AsyncAutoCompleteSelect.component';
import PropTypes from 'prop-types';

function setup() {
    const muiTheme = getMuiTheme();
    const props = {
        helpTitle: 'title',
        helpText: 'text',
        disabled: false,
        label: 'test'
    };

    return shallow(<AsyncAutoCompleteSelect {...props} />,{
        context: {muiTheme},
        childContextTypes: {muiTheme: PropTypes.object}});
}


describe('Add Journal article form snapshot tests', () => {
    it('renders default add journal article form', () => {
        const app = setup();
        expect(toJson(app)).toMatchSnapshot();
    });
});
