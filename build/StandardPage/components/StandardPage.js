'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = StandardPage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StandardPage(_ref) {
    var title = _ref.title,
        className = _ref.className,
        children = _ref.children;

    return _react2.default.createElement(
        'div',
        { className: '' + className },
        _react2.default.createElement(
            'h1',
            { className: 'title is-3' },
            title
        ),
        _react2.default.createElement(
            'div',
            { className: 'layout-card' },
            children
        )
    );
}

StandardPage.propTypes = {
    title: _propTypes2.default.string,
    className: _propTypes2.default.string,
    children: _propTypes2.default.any
};