jest.dontMock('./AutoCompleteSelect');

import AutoCompleteSelect from './AutoCompleteSelect';
import React from 'react';

import { mount} from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let subject;

function setup() {
    const store = createStore(combineReducers({ form: formReducer}));
    const authors = [
        {'id': 202, 'name': 'Author 8'},
        {'id': 263, 'name': 'Author 9'},
        {'id': 174, 'name': 'Author 10'},
        {'id': 177, 'name': 'Author 11'}
    ];
    const dsConfig = {text: 'name', value: 'id'};
    const props = {
        dataSource: authors,
        form: 'atestform',
        label: 'test',
        dataSourceConfig: dsConfig,
        formValue: 177

    };

    const muiTheme = getMuiTheme();

    subject = mount(
        <Provider store={store}>
            <AutoCompleteSelect {...props} />
        </Provider>,
        { context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}}
    );
}
describe('Autocompleteselect', () => {
    it('selects the last author in the list"', () => {
        setup();

        expect(subject.find({className: 'value' }).text()).toEqual('Author 11');
    });
});
