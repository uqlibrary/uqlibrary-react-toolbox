jest.dontMock('./MenuDrawer');

import {shallow} from 'enzyme';
import React from 'react';
import MenuDrawer from './MenuDrawer';

function setup(logo, logoAlt, drawerOpen, menuItems, docked) {

    const defaultMenuItems = [
        {
            linkTo: '/',
            primaryText: 'Primary text 0',
            secondaryText: 'secondary text 0'
        },
        {
            divider: true
        },
        {
            linkTo: '/my-plans',
            primaryText: 'Primary text 1',
            secondaryText: 'secondary text 1'
        }
    ];


    const props = {
        logo,
        logoAlt,
        menuItems: menuItems ? menuItems : defaultMenuItems,
        drawerOpen: drawerOpen,
        docked: docked,
        toggleDrawer: () => { },
    };

    return shallow(<MenuDrawer {...props} />);
}

describe('MenuDrawer unit tests tests', () => {
    it('true is true', () => {
        // proper unit tests are required for components with logic operations
        const wrapper = setup();
        expect(true).toBe(true);
    });
});
