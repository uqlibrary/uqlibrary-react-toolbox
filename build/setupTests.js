'use strict';

var _polyfill = require('../__mocks__/polyfill');

var _polyfill2 = _interopRequireDefault(_polyfill);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() }); /* eslint-disable */

window.HTMLElement.prototype.scrollIntoView = function () {};