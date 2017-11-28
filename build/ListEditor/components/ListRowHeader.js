'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ConfirmDialogBox = require('../../ConfirmDialogBox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons' },
    'delete_forever'
);

var ListRowHeader = function (_Component) {
    _inherits(ListRowHeader, _Component);

    function ListRowHeader(props) {
        _classCallCheck(this, ListRowHeader);

        var _this = _possibleConstructorReturn(this, (ListRowHeader.__proto__ || Object.getPrototypeOf(ListRowHeader)).call(this, props));

        _this.showConfirmation = function () {
            _this.confirmationBox.showConfirmation();
        };

        return _this;
    }

    _createClass(ListRowHeader, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                nameColumn = _props$locale.nameColumn,
                reorderColumn = _props$locale.reorderColumn,
                deleteAll = _props$locale.deleteAll,
                deleteAllConfirmation = _props$locale.deleteAllConfirmation;


            return _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-mobile listHeader datalist datalist-header' },
                _react2.default.createElement(_ConfirmDialogBox.ConfirmDialogBox, {
                    onRef: function onRef(ref) {
                        return _this2.confirmationBox = ref;
                    },
                    onAction: this.props.onDeleteAll,
                    locale: deleteAllConfirmation }),
                _react2.default.createElement(
                    'div',
                    { className: 'column name datalist-title' },
                    nameColumn
                ),
                !this.props.hideReorder && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow is-hidden-mobile order datalist-title' },
                    reorderColumn
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow buttons datalist-buttons' },
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            tooltip: deleteAll,
                            onTouchTap: this.showConfirmation,
                            disabled: this.props.disabled },
                        _ref
                    )
                )
            );
        }
    }]);

    return ListRowHeader;
}(_react.Component);

ListRowHeader.defaultProps = {
    locale: {
        nameColumn: 'Name',
        reorderColumn: 'Reorder items',
        deleteAll: 'Remove all items',
        deleteAllConfirmation: {
            confirmationTitle: 'Delete all',
            confirmationMessage: 'Are you sure you want to delete all items?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes'
        }
    }
};
exports.default = ListRowHeader;