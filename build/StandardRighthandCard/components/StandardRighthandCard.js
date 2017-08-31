'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = StandardRighthandCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StandardRighthandCard(_ref) {
    var title = _ref.title,
        children = _ref.children,
        help = _ref.help;

    return _react2.default.createElement(
        'div',
        { className: 'StandardRighthandCard' },
        _react2.default.createElement(
            'div',
            { className: 'columns is-gapless is-mobile facetsTitle' },
            _react2.default.createElement(
                'div',
                { className: 'column' },
                title && _react2.default.createElement(
                    'h2',
                    { className: 'title is-5' },
                    title
                )
            ),
            help && help.text && _react2.default.createElement(
                'div',
                { className: 'column is-narrow is-helpicon' },
                _react2.default.createElement(_index.HelpIcon, help)
            )
        ),
        children
    );
}

StandardRighthandCard.propTypes = {
    children: _propTypes2.default.any,
    title: _propTypes2.default.string,
    help: _propTypes2.default.shape({
        title: _propTypes2.default.string,
        text: _propTypes2.default.any,
        buttonLabel: _propTypes2.default.string
    })
};