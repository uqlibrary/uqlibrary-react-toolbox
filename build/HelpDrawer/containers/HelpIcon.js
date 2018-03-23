'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _HelpIcon = require('../components/HelpIcon');

var _HelpIcon2 = _interopRequireDefault(_HelpIcon);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelpIconContainer = (0, _reactRedux.connect)(undefined, function (dispatch) {
    return {
        onClick: function onClick(title, text, buttonLabel) {
            return dispatch((0, _actions.show)(title, text, buttonLabel));
        }
    };
})(_HelpIcon2.default);

exports.default = HelpIconContainer;