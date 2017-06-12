jest.dontMock('./Toggle');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from './Toggle';
import PropTypes from 'prop-types';

function setup() {
    const muiTheme = getMuiTheme();
    const props = {
        helpTitle: 'title',
        helpText: 'text',
        label: 'test'
    };

    return shallow(<Toggle {...props} />,{
        context: {muiTheme},
        childContextTypes: {muiTheme: PropTypes.object}});
}


describe('Add Toggle snapshot tests', () => {
    it('renders default toggle component', () => {
        const app = setup();
        expect(toJson(app)).toMatchSnapshot();
    });
});
