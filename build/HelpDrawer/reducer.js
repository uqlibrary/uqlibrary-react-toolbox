'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var initialState = {
    open: false,
    title: '',
    text: '',
    buttonLabel: 'OK'
};

var helpDrawerReducer = function helpDrawerReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.SHOW:
            return _extends({}, action.payload, {
                open: true
            });
        case _actions.HIDE:
            return _extends({}, initialState);
        default:
            return state;
    }
};

exports.default = helpDrawerReducer;