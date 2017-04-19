jest.dontMock('./MenuDrawer');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import MenuDrawer from './MenuDrawer';

function setup(drawerOpen, menuItems, docked, logoImage, logoText) {

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
            linkTo: '/xyz',
            primaryText: 'Primary text 1',
            secondaryText: 'secondary text 1'
        }
    ];


    const props = {
        menuItems: menuItems ? menuItems : defaultMenuItems,
        drawerOpen: drawerOpen,
        docked: docked,
        toggleDrawer: () => { },
        logoImage,
        logoText
    };

    return shallow(<MenuDrawer {...props} />);
}

describe('MenuDrawer snapshots tests', () => {
    it('renders menu with dividers', () => {
        const wrapper = setup();
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
    it('renders menu without dividers', () => {
        const menuItems = [
            {
                linkTo: '/',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            },
            {
                linkTo: '/abc',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            }
        ];
        const wrapper = setup(false, menuItems, false);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
    it('renders menu with logo', () => {
        const menuItems = [
            {
                linkTo: '/',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            },
            {
                linkTo: '/abc',
                primaryText: 'Primary text 0',
                secondaryText: 'secondary text 0'
            }
        ];
        const wrapper = setup(false, menuItems, false, 'http://image/image.svg', 'desc of image');
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});


