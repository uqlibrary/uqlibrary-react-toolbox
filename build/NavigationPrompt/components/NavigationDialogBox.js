'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NavigationPrompt = require('./NavigationPrompt');

var _NavigationPrompt2 = _interopRequireDefault(_NavigationPrompt);

var _ConfirmDialogBox = require('../../ConfirmDialogBox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement('span', null);

var NavigationDialogBox = function NavigationDialogBox(_ref) {
    var when = _ref.when,
        txt = _ref.txt;

    if (!when) return _ref2;
    return _react2.default.createElement(
        _NavigationPrompt2.default,
        { when: when },
        function (_setNavigationConfirmation, _onConfirm, _onCancel) {
            return _react2.default.createElement(_ConfirmDialogBox.ConfirmDialogBox, {
                onRef: _setNavigationConfirmation,
                onAction: _onConfirm,
                onCancelAction: _onCancel,
                locale: txt });
        }
    );
};

exports.default = NavigationDialogBox;