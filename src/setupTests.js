/* eslint-disable */
import raf from '../__mocks__/polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson from 'enzyme-to-json';
import 'babel-polyfill';

import getMuiTheme from 'material-ui/styles/getMuiTheme';


// get a mounted or shallow element
const getElement = (component, isShallow = true) => {
    if (isShallow) return shallow(component);
    return mount(component, {
            context: {
                muiTheme: getMuiTheme()
            },
            childContextTypes: {
                muiTheme: PropTypes.object.isRequired
            }
        });
};

// React Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
window.HTMLElement.prototype.scrollIntoView = function() {};

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// make standard libraries/methods globally available to all tests
global.getElement = getElement;
