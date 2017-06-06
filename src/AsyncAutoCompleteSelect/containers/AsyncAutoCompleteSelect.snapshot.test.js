jest.dontMock('./AsyncAutoComplete');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import {default  as AsyncAutoComplete} from './AsyncAutoComplete';

function setup() {
    const props = {
        helpTitle: 'title',
        helpText: 'text',
        disabled: false,
        label: 'test'
    };

    return shallow(<AsyncAutoComplete {...props} />);
}


describe('Add Journal article form snapshot tests', () => {
    it('renders default add journal article form', () => {
        const app = setup();
        expect(toJson(app)).toMatchSnapshot();
    });
});
