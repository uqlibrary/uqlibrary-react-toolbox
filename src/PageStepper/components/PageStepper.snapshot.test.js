jest.dontMock('./PageStepper');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import PageStepper from './PageStepper';

function setup() {
    const props = {
        formSections: ['Page 1 Test', 'Page 2 Test']
    };

    return shallow(<PageStepper {...props}>
        <div data-stepperIndex="0">Page 1</div>
        <div data-stepperIndex="1">Page 2</div>
    </PageStepper>);
}

describe('PageStepper snapshots tests', () => {
    it('renders the stepper', () => {
        const app = setup();
        expect(toJson(app)).toMatchSnapshot();

        // go to page 2
        app.setState({stepIndex: 1});
        expect(toJson(app)).toMatchSnapshot();
    });

});


