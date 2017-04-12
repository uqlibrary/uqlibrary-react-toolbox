'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = _immutable2.default.fromJS({
    open: false,
    title: '',
    text: '',
    buttonLabel: 'OK'
});

var helpDrawerReducer = function helpDrawerReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.SHOW:
            return _immutable2.default.fromJS(_extends({}, action.payload, { open: true }));
        case _actions.HIDE:
            return initialState;
        default:
            return state;
    }
};

var _default = helpDrawerReducer;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/HelpDrawer/reducer.js');

    __REACT_HOT_LOADER__.register(helpDrawerReducer, 'helpDrawerReducer', 'src/HelpDrawer/reducer.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/HelpDrawer/reducer.js');
}();

;