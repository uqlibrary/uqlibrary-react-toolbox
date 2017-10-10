'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = StandardCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Card = require('material-ui/Card');

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StandardCard(_ref) {
    var title = _ref.title,
        help = _ref.help,
        className = _ref.className,
        children = _ref.children;

    return _react2.default.createElement(
        _Card.Card,
        { className: className + ' standard-card' },
        _react2.default.createElement(
            _Card.CardHeader,
            { className: 'card-header' },
            _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-mobile' },
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    title && _react2.default.createElement(
                        'h2',
                        { className: 'cardTitle' },
                        title
                    )
                ),
                help && help.text && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow is-helpicon' },
                    _react2.default.createElement(_index.HelpIcon, help)
                )
            )
        ),
        _react2.default.createElement(
            _Card.CardText,
            { className: 'body-1' },
            _react2.default.createElement(
                'div',
                null,
                children
            )
        )
    );
}

StandardCard.defaultProps = {
    className: ''
};