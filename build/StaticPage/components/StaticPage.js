'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = StaticPage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Card = require('material-ui/Card');

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StaticPage(_ref) {
    var title = _ref.title,
        text = _ref.text,
        help = _ref.help;

    return _react2.default.createElement(
        'div',
        { className: 'layout-fill' },
        _react2.default.createElement(
            'h1',
            { className: 'page-title display-1' },
            title,
            help && _react2.default.createElement(_index.HelpIcon, {
                title: help.title,
                text: help.text,
                buttonLabel: help.button,
                inline: true })
        ),
        _react2.default.createElement(
            _Card.Card,
            { className: 'layout-card' },
            _react2.default.createElement(
                _Card.CardText,
                { className: 'body-1' },
                _react2.default.createElement('br', null),
                text
            )
        )
    );
}

StaticPage.propTypes = {
    title: _propTypes.PropTypes.string.isRequired,
    text: _propTypes.PropTypes.string.isRequired,
    help: _propTypes.PropTypes.object
};