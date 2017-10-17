'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = InlineLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement('br', null);

var _ref3 = _react2.default.createElement('br', null);

var _ref4 = _react2.default.createElement(_CircularProgress2.default, { size: 60, thickness: 8 });

var _ref5 = _react2.default.createElement('br', null);

var _ref6 = _react2.default.createElement('br', null);

var _ref7 = _react2.default.createElement('br', null);

var _ref8 = _react2.default.createElement('br', null);

function InlineLoader(_ref) {
    var message = _ref.message;

    return _react2.default.createElement(
        'div',
        { className: 'column align-center' },
        _ref2,
        _ref3,
        _ref4,
        ' ',
        _ref5,
        _ref6,
        _react2.default.createElement(
            'span',
            { className: 'cardTitle' },
            message
        ),
        ' ',
        _ref7,
        _ref8
    );
}

InlineLoader.defaultProps = {
    message: 'Loading...'
};