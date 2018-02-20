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

var _reactRedux = require('react-redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setupStoreForActions = function setupStoreForActions() {
    var middlewares = [_reduxThunk2.default];
    var mockStore = (0, _reduxMockStore2.default)(middlewares);
    return mockStore({});
}; /* eslint-disable */


var setupStoreForMount = function setupStoreForMount() {
    var initialState = _immutable2.default.Map();

    var store = {
        getState: jest.fn(function () {
            return initialState;
        }),
        dispatch: jest.fn(),
        subscribe: jest.fn()
    };
    var next = jest.fn();
    var invoke = function invoke(action) {
        return (0, _reduxThunk2.default)(store)(next)(action);
    };
    return { store: store, next: next, invoke: invoke };
};

window.HTMLElement.prototype.scrollIntoView = function () {};

// it's possible to extend expect globally,
// but that expect requires extra babel settings not compatible with the other components :-(
// import expect from 'expect';
// expect.extend({toHaveBla(input, output) { ... }})
// extensions for expect
var toHaveDispatchedActions = function toHaveDispatchedActions(actions, expectedActions) {
    var pass = actions.length === expectedActions.length;
    if (pass) {
        actions.map(function (item, index) {
            if (item.type !== expectedActions[index]) {
                pass = false;
                return;
            }
        });
    }
    return {
        message: function message(a, b) {
            return 'received actions don\'t match expected actions [' + actions.map(function (action) {
                return action.type;
            }) + '] vs [' + expectedActions.map(function (action) {
                return action;
            }) + ']';
        },
        pass: pass
    };
};

// for Promise.all - responses can come back out of order
var toHaveAnyOrderDispatchedActions = function toHaveAnyOrderDispatchedActions(actions, expectedActions) {
    var pass = actions.length === expectedActions.length;
    if (pass) {
        var sortedActions = actions.sort(function (a, b) {
            return a.type > b.type ? -1 : 1;
        });
        var sortedExpectedActions = expectedActions.sort(function (a, b) {
            return a > b ? -1 : 1;
        });

        sortedActions.map(function (item, index) {
            if (item.type !== sortedExpectedActions[index]) {
                pass = false;
                return;
            }
        });
    }
    return {
        message: function message(a, b) {
            return 'received actions don\'t match expected actions [' + actions.map(function (action) {
                return action.type;
            }) + '] vs [' + expectedActions.map(function (action) {
                return action;
            }) + ']';
        },
        pass: pass
    };
};

// usage in test:
// extend expect to check actions
// expect.extend({toHaveDispatchedActions});
// expect(store.getActions()).toHaveDispatchedActions(expectedActions);

// get a mounted or shallow element
var getElement = function getElement(component, props) {
    var isShallow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (isShallow) return (0, _enzyme.shallow)(_react2.default.createElement(component, props));
    return (0, _enzyme.mount)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: setupStoreForMount().store },
        _react2.default.createElement(component, props)
    ), {
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
global.injectTapEventPlugin = _reactTapEventPlugin2.default;

// make standard libraries/methods globally available to all tests
global.getElement = getElement;

// set global store for testing actions
global.setupStoreForActions = setupStoreForActions;
global.mockActionsStore = setupStoreForActions();

// expect extension
global.toHaveDispatchedActions = toHaveDispatchedActions;
global.toHaveAnyOrderDispatchedActions = toHaveAnyOrderDispatchedActions;