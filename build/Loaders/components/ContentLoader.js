'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ContentLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Card = require('material-ui/Card');

var _InlineLoader = require('./InlineLoader');

var _InlineLoader2 = _interopRequireDefault(_InlineLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContentLoader(_ref) {
    var message = _ref.message;

    return _react2.default.createElement(
        _Card.Card,
        { className: 'layout-card' },
        _react2.default.createElement(
            _Card.CardText,
            { className: 'column layout-fill align-center justify-center' },
            _react2.default.createElement(_InlineLoader2.default, { message: message })
        )
    );
}