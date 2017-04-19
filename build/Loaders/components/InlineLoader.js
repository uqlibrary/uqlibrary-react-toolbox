'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = InlineLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InlineLoader(_ref) {
    var message = _ref.message;

    return _react2.default.createElement(
        'div',
        { className: 'column align-center' },
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_CircularProgress2.default, { size: 60, thickness: 8 }),
        ' ',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
            'span',
            { className: 'headline' },
            message
        ),
        ' ',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null)
    );
}

InlineLoader.propTypes = {
    message: _propTypes.PropTypes.string
};

InlineLoader.defaultProps = {
    message: 'Loading...'
};