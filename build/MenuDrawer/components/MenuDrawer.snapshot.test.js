'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuDrawer = require('./MenuDrawer');

var _MenuDrawer2 = _interopRequireDefault(_MenuDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./MenuDrawer');

function setup(drawerOpen, menuItems, docked, logoImage, logoText) {

    var defaultMenuItems = [{
        linkTo: '/',
        primaryText: 'Primary text 0',
        secondaryText: 'secondary text 0'
    }, {
        divider: true
    }, {
        linkTo: '/xyz',
        primaryText: 'Primary text 1',
        secondaryText: 'secondary text 1'
    }];

    var props = {
        menuItems: menuItems ? menuItems : defaultMenuItems,
        drawerOpen: drawerOpen,
        docked: docked,
        toggleDrawer: function toggleDrawer() {},
        logoImage: logoImage,
        logoText: logoText
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_MenuDrawer2.default, props));
}

describe('MenuDrawer snapshots tests', function () {
    it('renders menu with dividers', function () {
        var wrapper = setup();
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
    it('renders menu without dividers', function () {
        var menuItems = [{
            linkTo: '/',
            primaryText: 'Primary text 0',
            secondaryText: 'secondary text 0'
        }, {
            linkTo: '/abc',
            primaryText: 'Primary text 0',
            secondaryText: 'secondary text 0'
        }];
        var wrapper = setup(false, menuItems, false);
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
    it('renders menu with logo', function () {
        var menuItems = [{
            linkTo: '/',
            primaryText: 'Primary text 0',
            secondaryText: 'secondary text 0'
        }, {
            linkTo: '/abc',
            primaryText: 'Primary text 0',
            secondaryText: 'secondary text 0'
        }];
        var wrapper = setup(false, menuItems, false, 'http://image/image.svg', 'desc of image');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});