jest.dontMock('../components/Alert');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Alert from '../components/Alert';

function setup({title, message, type}) {
    const props = {
        title: 'This is a title',
        message: 'This is a message',
        type: 'error'
    };
    return shallow(<Alert {...props} />);
}

describe('Alert snapshots test', () => {
    it('renders as expected', () => {
        const title = "This is a title";
        const message = "This is the message";
        const type = "error";

        const wrapper = setup(title, message, type);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});