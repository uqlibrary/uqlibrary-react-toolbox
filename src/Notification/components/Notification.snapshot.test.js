jest.dontMock('./Notification');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Immutable from 'immutable';

import Notification from './Notification';

function setup() {
    const props = {
        notifcationDetails: Immutable.fromJS({
            isOpen: true,
            message: 'test message'
        })
    }

    return shallow(<Notification {...props} />);
}


describe('Notification snapshot tests', () => {
    it('renders the notificiation component', () => {
        const app = setup();
        expect(toJson(app)).toMatchSnapshot();
    });
});
