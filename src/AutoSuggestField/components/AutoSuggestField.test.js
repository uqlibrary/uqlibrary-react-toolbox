import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import {AutoSuggestField} from './AutoSuggestField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import Immutable from 'immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';

const create = () => {
    const initialState = Immutable.Map();

    const store = {
        getState: jest.fn(() => (initialState)),
        dispatch: jest.fn(),
        subscribe: jest.fn()
    };
    const next = jest.fn();
    const invoke = (action) => thunk(store)(next)(action);
    return {store, next, invoke}
};

function setup(testProps, isShallow = true){
    const props = {
        ...testProps,
        itemsList: testProps.itemsList || [],
        itemsListLoading: testProps.itemsListLoading || false,
        onChange: testProps.onChange || jest.fn(),    // : PropTypes.func.isRequired,
        loadSuggestions: testProps.loadSuggestions || jest.fn()
    };

    if (!isShallow) {
        return mount(
            <Provider store={create().store}>
                <AutoSuggestField {...props} />
            </Provider>, {
                context: {
                    muiTheme: getMuiTheme()
                },
                childContextTypes: {
                    muiTheme: PropTypes.object.isRequired
                }
            });
    }

    return shallow(<Provider store={create().store}><AutoSuggestField {...props} /></Provider>);
}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('AutoSuggestField component', () => {

    it('should render', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with disabled flag set to true', () => {
        const wrapper = setup({disabled: true}, false);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with className set', () => {
        const wrapper = setup({className: 'requiredField'}, false);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render autosuggest field and call action creator', () => {
        const testFunction = jest.fn();
        const wrapper = setup({loadSuggestions: testFunction}, false);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(testFunction).toBeCalled();
    });

    it('should not set selected value if free text is not allowed', () => {
        const wrapper = setup({allowFreeText: false}).find('AutoSuggestField').dive();
        expect(wrapper.state.selectedValue).toBeFalsy();
        const testValue = 'School of Economics';
        wrapper.instance().valueSelected(testValue);
        expect(wrapper.state().selectedValue).toBeFalsy();
    });

    it('should set selected value if free text is allowed', () => {
        const wrapper = setup({allowFreeText: true}).find('AutoSuggestField').dive();
        expect(wrapper.state.selectedValue).toBeFalsy();
        const testValue = 'School of Economics';
        wrapper.instance().valueSelected(testValue);
        expect(wrapper.state().selectedValue).toEqual(testValue);
    });

    it('should set typed value as selected value if free text is allowed', () => {
        const wrapper = setup({allowFreeText: true}).find('AutoSuggestField').dive();
        expect(wrapper.state.selectedValue).toBeFalsy();
        const testValue = 'School of Economics';
        wrapper.instance().textUpdated(testValue);
        expect(wrapper.state().selectedValue).toEqual(testValue);
    });

    it('should set selected value to an object from the list if free text is not allowed', () => {
        const wrapper = setup({
            itemsList: [{key: 1, value: 'One'}],
            dataSourceConfig: { text: 'value', value: 'key'}
        }).find('AutoSuggestField').dive();
        expect(wrapper.state.selectedValue).toBeFalsy();
        wrapper.instance().valueSelected('text', 0);
        expect(wrapper.state().selectedValue).toEqual({key: 1, value: 'One'});
    });
});
