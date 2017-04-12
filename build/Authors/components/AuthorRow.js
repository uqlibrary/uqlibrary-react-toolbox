'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _person = require('material-ui/svg-icons/social/person');

var _person2 = _interopRequireDefault(_person);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

require('./Authors.scss');

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
            return _this.__remove__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        return _this;
    }

    _createClass(AuthorRow, [{
        key: '__remove__REACT_HOT_LOADER__',
        value: function __remove__REACT_HOT_LOADER__() {
            this.props.removeAuthor(this.props.authorID);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Author' },
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex authorLeftIcon' },
                        _react2.default.createElement(_person2.default, null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex-100 authorName' },
                        this.props.name
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex authorRightIcon' },
                        _react2.default.createElement(_RaisedButton2.default, { label: 'Remove', onClick: this.remove })
                    )
                )
            );
        }
    }]);

    return AuthorRow;
}(_react.Component);

AuthorRow.propTypes = {
    name: _propTypes.PropTypes.string.isRequired,
    authorID: _propTypes.PropTypes.number.isRequired,
    removeAuthor: _propTypes.PropTypes.func.isRequired
};
var _default = AuthorRow;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(AuthorRow, 'AuthorRow', 'src/Authors/components/AuthorRow.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Authors/components/AuthorRow.js');
}();

;