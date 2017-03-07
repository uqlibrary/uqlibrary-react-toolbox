jest.dontMock('./MenuDrawer');
import {shallow} from 'enzyme';
import React from 'react';
import MenuDrawer from './MenuDrawer';

function setup(drawerOpen, menuItems, docked) {

    const props = {
        menuItems: [
            {
                linkTo: '/',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            },
            {
                linkTo: '/my-plans',
                primaryText: 'Primary text 1',
                secondaryText: 'secondary text 1'
            }],
        drawerOpen: drawerOpen,
        docked: docked,
        toggleDrawer: () => {
        },
    };
    return shallow(<MenuDrawer {...props} />);
}

describe('MenuDrawer tests', () => {
    it('renders logo in the drawer component', () => {
        const wrapper = setup();

        expect(wrapper.find('.logo-wrapper').length).toBe(1);
        expect(wrapper.find('.logo-wrapper img[alt="University of Queensland logo"]').length).toBe(1);
    });

    it('renders 2 menu items', () => {
        const wrapper = setup();

        expect(wrapper.find('.main-menu span').length).toBe(2);
    });
});
