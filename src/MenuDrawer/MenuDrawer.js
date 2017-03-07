import React from 'react';
import { Link } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import './MenuDrawer.scss';

const propTypes = {
    menuItems: React.PropTypes.array,
    drawerOpen: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    toggleDrawer: React.PropTypes.func
};

const MenuDrawer = ({menuItems, toggleDrawer, drawerOpen, docked}) => {
    const uqLogo = 'https://static.uq.net.au/v1/logos/corporate/uq-logo-white.svg';

    return (
        <Drawer
            containerClassName="main-drawer flex"
            open={drawerOpen}
            width={320}
            onRequestChange={() => toggleDrawer(!drawerOpen)}
            docked={docked}>
            <div className="layout-fill side-drawer">
                <div className="logo-wrapper">
                    <img src={uqLogo} alt="University of Queensland logo" />
                </div>
                <List className="main-menu">
                  {menuItems.map((menuItem, index) =>
                    <span key={index}>
                      <Divider />
                      <Link to={menuItem.linkTo}>
                          <ListItem primaryText={menuItem.primaryText} secondaryText={menuItem.secondaryText} />
                      </Link>
                    </span>
                  )}
                </List>
            </div>
        </Drawer>
    );
};

MenuDrawer.propTypes = propTypes;

export default MenuDrawer;
