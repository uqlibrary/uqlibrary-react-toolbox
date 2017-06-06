jest.dontMock('./AsyncAutoCompleteSelect.component');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AsyncAutoCompleteSelect from './AsyncAutoCompleteSelect.component';
import PropTypes from 'prop-types';
import sinon from 'sinon';

let onChange;

function setup(testData = {}) {
    onChange = sinon.spy();
    const muiTheme = getMuiTheme();
    const props = {
        helpTitle: 'title',
        helpText: 'text',
        disabled: false,
        label: 'test',
        alwaysRenderSuggestions: testData.alwaysRenderSuggestion,
        onChange
    };

    return shallow(<AsyncAutoCompleteSelect {...props} />,{
        context: {muiTheme},
        childContextTypes: {muiTheme: PropTypes.object}});
}


describe('Add Journal article form unit tests', () => {
    it('checks if closeModal state is set', () => {
        const app = setup();

        app.instance().closeModal();
        expect(app.state('isModalOpen')).toEqual(false);
    });

    it('checks if openModal state is set', () => {
        const app = setup();

        app.instance().openModal();
        expect(app.state('isModalOpen')).toEqual(true);
        expect(app.state('searchValue')).toEqual('');
    });

    it('checks if isFocused state is true', () => {
        const app = setup();

        app.instance().onFocus();
        expect(app.state('isFocused')).toEqual(true);
    });

    it('checks if isFocused state is false', () => {
        const app = setup();

        app.instance().onBlur();
        expect(app.state('isFocused')).toEqual(false);
    });

    it('checks if should render suggestions', () => {
        const app = setup();

        let result = app.instance().shouldRenderSuggestions('test');
        expect(result).toEqual(true);

        result = app.instance().shouldRenderSuggestions(1);
        expect(result).toEqual(false);
    });

    it('checks if getSuggestionValue returns suggestion', () => {
        const app = setup();

        let result = app.instance().getSuggestionValue('test');
        expect(result).toEqual('test');

        result = app.instance().shouldRenderSuggestions(1);
        expect(result).toEqual(false);
    });

    it('checks if getSuggestionValue returns the same input value', () => {
        const testData =  {};
        let app = setup(testData);

        app.instance().onSuggestionsClearRequested();
        expect(app.state('suggestions')).toEqual([]);

        testData.alwaysRenderSuggestion = true;
        app = setup(testData);
        app.instance().onSuggestionsClearRequested();
        expect(app.state('suggestions')).toEqual([]);
    });

    it('checks if onSuggestionSelected onChange is called', () => {
        const app = setup();

        app.instance().onSuggestionSelected(jest.fn(), 'test');
        expect(onChange.calledOnce).toEqual(true);
    });

});
