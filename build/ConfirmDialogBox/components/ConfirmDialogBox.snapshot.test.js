'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ConfirmDialogBox = require('./ConfirmDialogBox');

var _ConfirmDialogBox2 = _interopRequireDefault(_ConfirmDialogBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./ConfirmDialogBox');

function setup(_ref) {
    var locale = _ref.locale,
        hideCancelButton = _ref.hideCancelButton,
        cancelAction = _ref.cancelAction,
        action = _ref.action;

    var props = {
        locale: locale || {
            confirmationTitle: 'Confirmation',
            confirmationMessage: 'Are you sure?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes'
        },
        onAction: action || jest.fn(),
        onCancelAction: cancelAction || jest.fn(),
        hideCancelButton: hideCancelButton || false,
        onRef: jest.fn()
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_ConfirmDialogBox2.default, props));
}

describe('ConfirmDialogBox snapshots tests', function () {
    it('renders component with yes/no buttons', function () {
        var wrapper = setup({});
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders component with yes', function () {
        var wrapper = setup({ hideCancelButton: true });
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
    it('renders component with customised locale', function () {
        var wrapper = setup({ locale: {
                confirmationTitle: 'ENG: Confirmation',
                confirmationMessage: 'ENG: Are you sure?',
                cancelButtonLabel: 'ENG: No',
                confirmButtonLabel: 'ENG: Yes'
            } });
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});