'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _AutoCompleteSelect = require('../../AutoCompleteSelect');

var _AuthorRow = require('./AuthorRow');

var _AuthorRow2 = _interopRequireDefault(_AuthorRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Authors = function (_Component) {
    _inherits(Authors, _Component);

    function Authors(props) {
        _classCallCheck(this, Authors);

        var _this = _possibleConstructorReturn(this, (Authors.__proto__ || Object.getPrototypeOf(Authors)).call(this, props));

        _this.addAuthor = function () {
            var authorId = _this.props.formValues.get('authorName');
            var matchedAuthor = _this.props.dataSource.find(function findMatchedAuthor(obj) {
                return obj.get('id') === authorId;
            });
            _this.props.addAuthor(matchedAuthor);
        };

        _this.removeAuthor = function (i) {
            _this.props.removeAuthor(i);
        };

        _this.createAuthorRow = function (selectedAuthors) {
            if (typeof selectedAuthors === 'undefined' || selectedAuthors.size === 0) {
                return '';
            } else {
                return selectedAuthors.valueSeq().map(function (author, i) {
                    return _react2.default.createElement(_AuthorRow2.default, {
                        key: i,
                        authorID: author.get('id'),
                        name: author.get('name'),
                        removeAuthorLabel: _this.props.removeAuthorLabel,
                        removeAuthor: _this.removeAuthor });
                });
            }
        };

        _this.prepDataSource = function (listOfAuthors) {
            var authors = [];

            if (typeof listOfAuthors !== 'undefined' && listOfAuthors.size > 0) {
                listOfAuthors.map(function (author) {
                    authors.push({ 'id': author.get('id'), 'name': author.get('name') });
                });
            }

            return authors;
        };

        return _this;
    }

    _createClass(Authors, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dataSource = _props.dataSource,
                formValues = _props.formValues,
                selectedAuthors = _props.selectedAuthors;


            var ListOfAuthors = this.createAuthorRow(selectedAuthors);
            var authorsDataSource = this.prepDataSource(dataSource);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row', style: { marginBottom: '50px' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex inputPadding' },
                        _react2.default.createElement(_reduxForm.Field, { component: _AutoCompleteSelect.AutoCompleteSelect, name: 'authorName',
                            maxSearchResults: 10,
                            label: this.props.authorFieldLabel,
                            dataSource: authorsDataSource,
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
    dataSource: _react2.default.PropTypes.object.isRequired,
    form: _react2.default.PropTypes.string.isRequired,
    addAuthor: _react2.default.PropTypes.func,
    removeAuthor: _react2.default.PropTypes.func,
    formValues: _react2.default.PropTypes.object,
    listOfAuthors: _react2.default.PropTypes.object,
    selectedAuthors: _react2.default.PropTypes.object,
    authorFieldLabel: _react2.default.PropTypes.string,
    removeAuthorLabel: _react2.default.PropTypes.string
};
Authors.defaultProps = {
    authorFieldLabel: 'Author name (as published, in order)',
    removeAuthorLabel: 'Remove'
};
exports.default = Authors;