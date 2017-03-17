jest.dontMock('./MenuDrawer');

import {shallow} from 'enzyme';
import React from 'react';
import MenuDrawer from './MenuDrawer';

function setup(drawerOpen, menuItems, docked) {

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
        menuItems: menuItems ? menuItems : defaultMenuItems,
        drawerOpen: drawerOpen,
        docked: docked,
        toggleDrawer: () => { },
    };

    return shallow(<MenuDrawer {...props} />);
}

describe('MenuDrawer tests', () => {
    it('renders logo in the drawer component', () => {
        const wrapper = setup();

        expect(wrapper.find('.logo-wrapper').length).toBe(1);
        expect(wrapper.find('.logo-wrapper img[alt="University of Queensland logo"]').length).toBe(1);
    });

    it('renders menu with dividers', () => {
        const wrapper = setup();
        expect(wrapper.find('.main-menu span.menu-item-container').length).toBe(3);
    });

    it('renders menu without dividers', () => {
        const menuItems = [
            {
                linkTo: '/',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            },
            {
                linkTo: '/',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            }
        ];
        const wrapper = setup(false, menuItems, false);

        expect(wrapper.find('.main-menu span.menu-item-container').length).toBe(2);
    });
});
