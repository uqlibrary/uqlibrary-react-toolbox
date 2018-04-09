'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ListRowHeader = require('./ListRowHeader');

var _ListRowHeader2 = _interopRequireDefault(_ListRowHeader);

var _ListRow = require('./ListRow');

var _ListRow2 = _interopRequireDefault(_ListRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListsEditor = function (_Component) {
    _inherits(ListsEditor, _Component);

    function ListsEditor(props) {
        _classCallCheck(this, ListsEditor);

        var _this = _possibleConstructorReturn(this, (ListsEditor.__proto__ || Object.getPrototypeOf(ListsEditor)).call(this, props));

        _this.transformOutput = function (items) {
            return items.map(function (item, index) {
                var _ref;

                return _ref = {}, _defineProperty(_ref, _this.props.searchKey.value, item), _defineProperty(_ref, _this.props.searchKey.order, index + 1), _ref;
            });
        };

        _this.addItem = function (item) {
            if (!!item && (_this.props.maxCount === 0 || _this.state.itemList.length < _this.props.maxCount) && (!_this.props.distinctOnly || _this.state.itemList.indexOf(item) === -1)) {
                _this.setState({
                    itemList: [].concat(_toConsumableArray(_this.state.itemList), [item])
                });
            }
        };

        _this.moveUpList = function (item, index) {
            if (index === 0) return;
            var nextList = _this.state.itemList[index - 1];
            _this.setState({
                itemList: [].concat(_toConsumableArray(_this.state.itemList.slice(0, index - 1)), [item, nextList], _toConsumableArray(_this.state.itemList.slice(index + 1)))
            });
        };

        _this.moveDownList = function (item, index) {
            if (index === _this.state.itemList.length - 1) return;
            var nextList = _this.state.itemList[index + 1];
            _this.setState({
                itemList: [].concat(_toConsumableArray(_this.state.itemList.slice(0, index)), [nextList, item], _toConsumableArray(_this.state.itemList.slice(index + 2)))
            });
        };

        _this.deleteItem = function (item, index) {
            _this.setState({
                itemList: _this.state.itemList.filter(function (_, i) {
                    return i !== index;
                })
            });
        };

        _this.deleteAllItems = function () {
            _this.setState({
                itemList: []
            });
        };

        _this.state = {
            itemList: []
        };
        return _this;
    }

    _createClass(ListsEditor, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            // notify parent component when local state has been updated, eg itemList added/removed/reordered
            if (this.props.onChange) {
                this.props.onChange(this.transformOutput(nextState.itemList));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var renderListsRows = this.state.itemList.map(function (item, index) {
                return _react2.default.createElement(_ListRow2.default, _extends({
                    key: index,
                    index: index,
                    item: item,
                    canMoveDown: index !== _this2.state.itemList.length - 1,
                    canMoveUp: index !== 0,
                    onMoveUp: _this2.moveUpList,
                    onMoveDown: _this2.moveDownList,
                    onDelete: _this2.deleteItem
                }, _this2.props.locale && _this2.props.locale.row ? _this2.props.locale.row : {}, {
                    hideReorder: _this2.props.hideReorder,
                    disabled: _this2.props.disabled }));
            });

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                _react2.default.createElement(this.props.formComponent, _extends({
                    inputField: this.props.inputField,
                    onAdd: this.addItem,
                    remindToAdd: this.props.remindToAdd
                }, this.props.locale && this.props.locale.form ? this.props.locale.form : {}, {
                    isValid: this.props.isValid,
                    disabled: this.props.disabled || this.props.maxCount > 0 && this.state.itemList.length >= this.props.maxCount,
                    errorText: this.props.errorText })),
                this.state.itemList.length > 0 && _react2.default.createElement(_ListRowHeader2.default, _extends({}, this.props.locale && this.props.locale.header ? this.props.locale.header : {}, {
                    onDeleteAll: this.deleteAllItems,
                    hideReorder: this.props.hideReorder,
                    disabled: this.props.disabled })),
                renderListsRows
            );
        }
    }]);

    return ListsEditor;
}(_react.Component);

ListsEditor.defaultProps = {
    hideReorder: false,
    distinctOnly: false,
    searchKey: {
        value: 'rek_value',
        order: 'rek_order'
    },
    maxCount: 0
};
exports.default = ListsEditor;