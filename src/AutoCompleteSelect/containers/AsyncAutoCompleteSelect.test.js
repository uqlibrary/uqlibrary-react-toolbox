jest.dontMock('./AsyncAutoCompleteSelect');

import AsyncAutoCompleteSelect from './AsyncAutoCompleteSelect';
import React from 'react';

import {mount} from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let subject;

function setup() {
    const store = createStore(combineReducers({form: formReducer}));
    const filterItems = [
        {
            username: 'uqbmarley',
            orcid: '11111-11111-11111-11111-11111',
            name: 'Bob Marley',
            mail: 'redacted@uq.edu.au',
            title: 'Prof.',
            fullTitle: 'Associate Professor',
            school: 'Institute for Molecular Bioscience'
        },
        {
            username: 'uqckent',
            name: 'Clark Kent',
            mail: 'redacted2@uq.edu.au',
            title: 'Sup.',
            fullTitle: 'Superman',
            school: '¯\\_(ツ)_/¯'
        }
    ];

    const filteredStaff = {name: 'Clark Kent',
        mail: 'redacted2@uq.edu.au'};

    const props = {
        filterItems: () => {return filterItems;},
        form: 'atestform',
        label: 'label for the form',
        value: filteredStaff,
        labelField: 'name'
    };


    const muiTheme = getMuiTheme();

    subject = mount(
        <Provider store={store}>
            <AsyncAutoCompleteSelect {...props} />
        </Provider>,
        { context: {muiTheme},
            childContextTypes: {muiTheme: PropTypes.object}}
    );
}
describe('AsyncAutocompleteselect', () => {
    it('selects the last staff member in the list"', () => {
        setup();

        expect(subject.find({className: 'value' }).text()).toEqual('Clark Kent');
    });
});
