'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AuthButton = require('../components/AuthButton');

var _AuthButton2 = _interopRequireDefault(_AuthButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../components/AuthButton');

function setup(_ref) {
    var _ref$isAuthorizedUser = _ref.isAuthorizedUser,
        isAuthorizedUser = _ref$isAuthorizedUser === undefined ? false : _ref$isAuthorizedUser,
        _ref$loginUrl = _ref.loginUrl,
        loginUrl = _ref$loginUrl === undefined ? 'https://login' : _ref$loginUrl,
        _ref$logoutUrl = _ref.logoutUrl,
        logoutUrl = _ref$logoutUrl === undefined ? 'https://logout' : _ref$logoutUrl,
        _ref$loginText = _ref.loginText,
        loginText = _ref$loginText === undefined ? 'login into the system' : _ref$loginText,
        _ref$logoutText = _ref.logoutText,
        logoutText = _ref$logoutText === undefined ? 'logout' : _ref$logoutText;

    var props = { isAuthorizedUser: isAuthorizedUser, loginUrl: loginUrl, logoutUrl: logoutUrl, loginText: loginText, logoutText: logoutText };
    return (0, _enzyme.shallow)(_react2.default.createElement(_AuthButton2.default, props));
}

describe('AuthButton snapshots test', function () {
    it('renders logged out status', function () {
        var wrapper = setup({ isAuthorizedUser: false });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });

    it('renders logged in user status', function () {
        var wrapper = setup({ isAuthorizedUser: true });
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });
});