'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _HelpDrawer = require('../components/HelpDrawer');

var _HelpDrawer2 = _interopRequireDefault(_HelpDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelpDrawerContainer = (0, _reactRedux.connect)(function (state) {
    return state.get('helpDrawer') ? state.get('helpDrawer').toJS() : {};
}, function (dispatch) {
    return {
        hide: function hide() {
            return dispatch((0, _actions.hide)());
        }
    };
})(_HelpDrawer2.default);

exports.default = HelpDrawerContainer;