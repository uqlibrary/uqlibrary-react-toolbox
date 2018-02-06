/* eslint-disable */
import raf from '../__mocks__/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });
window.HTMLElement.prototype.scrollIntoView = function() {};
