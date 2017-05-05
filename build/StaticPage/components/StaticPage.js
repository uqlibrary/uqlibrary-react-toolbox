'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = StaticPage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
            title ? title : 'This is the page title'
        ),
        _react2.default.createElement(
            _Card.Card,
            { className: 'layout-card' },
            _react2.default.createElement(
                _Card.CardHeader,
                { className: 'card-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'columns is-gapless' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'headline' },
                            title ? title : 'This is the card title'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        help && _react2.default.createElement(_index.HelpIcon, {
                            title: help.title,
                            text: help.text,
                            buttonLabel: help.button
                        })
                    )
                )
            ),
            _react2.default.createElement(
                _Card.CardText,
                { className: 'body-1' },
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    null,
                    text ? text : 'This is the default card content'
                )
            )
        )
    );
}

StaticPage.propTypes = {
    title: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string.isRequired,
    help: _propTypes2.default.object
};

StaticPage.defaultProps = {};