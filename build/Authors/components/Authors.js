'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _immutable = require('redux-form/immutable');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _AutoCompleteSelect = require('../../AutoCompleteSelect');

var _AuthorRow = require('./AuthorRow');

var _AuthorRow2 = _interopRequireDefault(_AuthorRow);

require('./Authors.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Authors = function (_Component) {
    _inherits(Authors, _Component);

    function Authors(props) {
        _classCallCheck(this, Authors);

        var _this = _possibleConstructorReturn(this, (Authors.__proto__ || Object.getPrototypeOf(Authors)).call(this, props));

        _this.componentDidMount = function () {
            return _this.__componentDidMount__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.addAuthor = function () {
            return _this.__addAuthor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.removeAuthor = function () {
            return _this.__removeAuthor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.createAuthorRow = function () {
            return _this.__createAuthorRow__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.createListofAuthors = function () {
            return _this.__createListofAuthors__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        return _this;
    }

    _createClass(Authors, [{
        key: '__componentDidMount__REACT_HOT_LOADER__',
        value: function __componentDidMount__REACT_HOT_LOADER__() {
            this.props.loadAuthors();
        }
    }, {
        key: '__addAuthor__REACT_HOT_LOADER__',
        value: function __addAuthor__REACT_HOT_LOADER__() {
            this.props.addAuthor(this.props.formValues.get('authorName'));
        }
    }, {
        key: '__removeAuthor__REACT_HOT_LOADER__',
        value: function __removeAuthor__REACT_HOT_LOADER__(i) {
            this.props.removeAuthor(i);
        }
    }, {
        key: '__createAuthorRow__REACT_HOT_LOADER__',
        value: function __createAuthorRow__REACT_HOT_LOADER__(selectedAuthors) {
            var _this2 = this;

            if (typeof selectedAuthors === 'undefined') {
                return '';
            } else {
                console.log('createAuthorRow start');
                return selectedAuthors.valueSeq().map(function (author, i) {
                    console.log('createAuthorRow author', author);
                    return _react2.default.createElement(_AuthorRow2.default, { key: i, authorID: author.get('id'), name: author.get('name'),
                        removeAuthor: _this2.removeAuthor });
                });
            }
        }
    }, {
        key: '__createListofAuthors__REACT_HOT_LOADER__',
        value: function __createListofAuthors__REACT_HOT_LOADER__(listOfAuthors) {
            var authors = [];

            if (typeof listOfAuthors !== 'undefined') {
                listOfAuthors.map(function (author) {
                    authors.push({ 'id': author.get('id'), 'name': author.get('name') });
                });
            }

            return authors;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                listOfAuthors = _props.listOfAuthors,
                formValues = _props.formValues,
                selectedAuthors = _props.selectedAuthors;

            var ListOfAuthors = this.createAuthorRow(selectedAuthors);

            var authors = this.createListofAuthors(listOfAuthors);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row', style: { marginBottom: '50px' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex inputPadding' },
                        _react2.default.createElement(_immutable.Field, { component: _AutoCompleteSelect.AutoCompleteSelect, name: 'authorName',
                            maxSearchResults: 10,
                            label: 'Author name (as published, in order)',
                            dataSource: authors,
                            dataSourceConfig: { text: 'name', value: 'id' },
                            openOnFocus: true,
                            fullWidth: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex', style: { flex: '0 0 80px', textAlign: 'right' } },
                        _react2.default.createElement(_RaisedButton2.default, { label: 'Add', secondary: true, style: { marginTop: '30px' }, onClick: this.addAuthor, disabled: formValues && formValues.size === 0 })
                    )
                ),
                ListOfAuthors,
                ListOfAuthors.length > 0 && _react2.default.createElement(_Divider2.default, { style: { margin: '10px 0 0 0' } })
            );
        }
    }]);

    return Authors;
}(_react.Component);

Authors.propTypes = {
    addAuthor: _propTypes.PropTypes.func,
    removeAuthor: _propTypes.PropTypes.func,
    formValues: _propTypes.PropTypes.object,
    loadAuthors: _propTypes.PropTypes.func,
    listOfAuthors: _propTypes.PropTypes.object,
    selectedAuthors: _propTypes.PropTypes.object,
    form: _propTypes.PropTypes.string.isRequired
};
var _default = Authors;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Authors, 'Authors', 'src/Authors/components/Authors.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Authors/components/Authors.js');
}();

;