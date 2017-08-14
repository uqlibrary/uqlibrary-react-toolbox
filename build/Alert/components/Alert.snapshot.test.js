'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../components/Alert');

function setup(_ref) {
    var title = _ref.title,
        message = _ref.message,
        type = _ref.type,
        outsideLayout = _ref.outsideLayout,
        action = _ref.action,
        actionButtonLabel = _ref.actionButtonLabel,
        allowDismiss = _ref.allowDismiss,
        dismissAction = _ref.dismissAction;

    var props = {
        title: title || 'This is a title',
        message: message || 'This is a message',
        type: type || 'error',
        outsideLayout: outsideLayout,
        action: action,
        actionButtonLabel: actionButtonLabel,
        allowDismiss: allowDismiss,
        dismissAction: dismissAction
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, props));
}

describe('Alert snapshots test', function () {
    it('renders Alert of error type', function () {
        var title = "This is a title";
        var message = "This is the message";
        var type = "error";

        var wrapper = setup({ title: title, message: message, type: type });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });

    it('renders Alert of error type should render outside layout', function () {
        var wrapper = setup({ outsideLayout: true });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });

    it('renders Alert of error type should render action button', function () {
        var wrapper = setup({ action: jest.fn(), actionButtonLabel: 'Do something' });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });

    it('renders Alert of error type should render dismiss icon button', function () {
        var wrapper = setup({ allowDismiss: true, dismissAction: jest.fn() });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });

    it('renders Alert of error type should render dismiss icon button and action button', function () {
        var wrapper = setup({ action: jest.fn(), actionButtonLabel: 'Do something', allowDismiss: true, dismissAction: jest.fn() });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });
});