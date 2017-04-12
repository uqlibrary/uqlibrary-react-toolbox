jest.dontMock('./StaticPage');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import StaticPage from './StaticPage';

function setup(title, text, help) {
    const props = {title, text, help};
    return shallow(<StaticPage {...props} />);
}

describe('StaticPage snapshots tests', () => {
    it('renders StaticPage with title and text', () => {
        const wrapper = setup('about', 'this is about page');
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders StaticPage with title, text and help button', () => {
        const wrapper = setup('about', 'this is about page', {title: 'help', text: 'help text'});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});