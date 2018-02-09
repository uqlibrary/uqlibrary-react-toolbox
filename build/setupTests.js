'use strict';

var _polyfill = require('../__mocks__/polyfill');

var _polyfill2 = _interopRequireDefault(_polyfill);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

require('babel-polyfill');

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get a mounted or shallow element
/* eslint-disable */
var getElement = function getElement(component) {
    var isShallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (isShallow) return (0, _enzyme.shallow)(component);
    return (0, _enzyme.mount)(component, {
        context: {
            muiTheme: (0, _getMuiTheme2.default)()
        },
        childContextTypes: {
            muiTheme: _propTypes2.default.object.isRequired
        }
    });
};

// React Enzyme adapter
_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

// Make Enzyme functions available in all test files without importing
global.shallow = _enzyme.shallow;
global.render = _enzyme.render;
global.mount = _enzyme.mount;
global.toJson = _enzymeToJson2.default;

// make standard libraries/methods globally available to all tests
global.getElement = getElement;