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
    'keyboard_arrow_up'
);

var _ref2 = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons' },
    'keyboard_arrow_down'
);

var _ref3 = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons deleteIcon' },
    'delete'
);

var ListRow = function (_Component) {
    _inherits(ListRow, _Component);

    function ListRow(props) {
        _classCallCheck(this, ListRow);

        var _this = _possibleConstructorReturn(this, (ListRow.__proto__ || Object.getPrototypeOf(ListRow)).call(this, props));

        _this.showConfirmation = function () {
            _this.confirmationBox.showConfirmation();
        };

        _this.deleteRecord = function () {
            if (!_this.props.disabled && _this.props.onDelete) _this.props.onDelete(_this.props.item, _this.props.index);
        };

        _this.onMoveUp = function () {
            if (!_this.props.disabled && _this.props.onMoveUp) _this.props.onMoveUp(_this.props.item, _this.props.index);
        };

        _this.onMoveDown = function () {
            if (!_this.props.disabled && _this.props.onMoveDown) _this.props.onMoveDown(_this.props.item, _this.props.index);
        };

        return _this;
    }

    _createClass(ListRow, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-mobile listRow datalist datalist-row' },
                _react2.default.createElement(_ConfirmDialogBox.ConfirmDialogBox, {
                    onRef: function onRef(ref) {
                        return _this2.confirmationBox = ref;
                    },
                    onAction: this.deleteRecord,
                    locale: this.props.locale.deleteRecordConfirmation }),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text' },
                    this.props.item
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow is-hidden-mobile listReorder datalist-buttons' },
                    this.props.canMoveUp && _react2.default.createElement(
                        _IconButton2.default,
                        {
                            tooltip: this.props.locale.moveUpHint,
                            onTouchTap: this.onMoveUp,
                            className: 'reorderUp',
                            disabled: this.props.disabled },
                        _ref
                    ),
                    this.props.canMoveDown && _react2.default.createElement(
                        _IconButton2.default,
                        {
                            tooltip: this.props.locale.moveDownHint,
                            onTouchTap: this.onMoveDown,
                            className: 'reorderDown',
                            disabled: this.props.disabled },
                        _ref2
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow listDelete datalist-buttons' },
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            className: 'itemDelete',
                            tooltip: this.props.locale.deleteHint,
                            onTouchTap: this.showConfirmation,
                            disabled: this.props.disabled },
                        _ref3
                    )
                )
            );
        }
    }]);

    return ListRow;
}(_react.Component);

ListRow.defaultProps = {
    locale: {
        moveUpHint: 'Move item up the order',
        moveDownHint: 'Move item down the order',
        deleteHint: 'Remove this item',
        deleteRecordConfirmation: {
            confirmationTitle: 'Delete item',
            confirmationMessage: 'Are you sure you want to delete this item?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes'
        }
    }
};
exports.default = ListRow;