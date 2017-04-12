'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuDrawer = require('./MenuDrawer');

var _MenuDrawer2 = _interopRequireDefault(_MenuDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./MenuDrawer');

function setup(logo, logoAlt, drawerOpen, menuItems, docked) {

    var defaultMenuItems = [{
        linkTo: '/',
        primaryText: 'Primary text 0',
        secondaryText: 'secondary text 0'
    }, {
        divider: true
    }, {
        linkTo: '/my-plans',
        primaryText: 'Primary text 1',
        secondaryText: 'secondary text 1'
    }];

    var props = {
        logo: logo,
        logoAlt: logoAlt,
        menuItems: menuItems ? menuItems : defaultMenuItems,
        drawerOpen: drawerOpen,
        docked: docked,
        toggleDrawer: function toggleDrawer() {}
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_MenuDrawer2.default, props));
}

describe('MenuDrawer unit tests tests', function () {
    it('true is true', function () {
        // proper unit tests are required for components with logic operations
        var wrapper = setup();
        expect(true).toBe(true);
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/MenuDrawer/components/MenuDrawer.test.js');
}();

;