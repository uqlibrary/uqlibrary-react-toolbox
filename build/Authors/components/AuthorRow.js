'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _person = require('material-ui/svg-icons/social/person');

var _person2 = _interopRequireDefault(_person);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthorRow = function (_Component) {
    _inherits(AuthorRow, _Component);

    function AuthorRow(props) {
        _classCallCheck(this, AuthorRow);

        var _this = _possibleConstructorReturn(this, (AuthorRow.__proto__ || Object.getPrototypeOf(AuthorRow)).call(this, props));

        _this.remove = function () {
            _this.props.removeAuthor(_this.props.authorID);
        };

        return _this;
    }

    _createClass(AuthorRow, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'columns', style: { padding: '10px' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-narrow' },
                        _react2.default.createElement(_person2.default, null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        this.props.name
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-narrow' },
                        _react2.default.createElement(_RaisedButton2.default, { label: this.props.removeAuthorLabel, onClick: this.remove })
                    )
                )
            );
        }
    }]);

    return AuthorRow;
}(_react.Component);

AuthorRow.propTypes = {
    name: _propTypes2.default.string.isRequired,
    authorID: _propTypes2.default.number.isRequired,
    removeAuthorLabel: _propTypes2.default.string.isRequired,
    removeAuthor: _propTypes2.default.func.isRequired
};
AuthorRow.defaultProps = {
    removeAuthorLabel: 'Remove'
};
exports.default = AuthorRow;