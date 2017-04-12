import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import './MenuDrawer.scss';

const propTypes = {
    menuItems: React.PropTypes.array.isRequired,
    drawerOpen: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    toggleDrawer: React.PropTypes.func,
    imgLogo: React.PropTypes.string,
    imgAltText: React.PropTypes.string
};

const defaultProps = {
    imgAltText: 'University of Queensland logo',
    imgLogo: 'https://static.uq.net.au/v1/logos/corporate/uq-logo-white.svg'
}

const MenuDrawer = ({menuItems, toggleDrawer, drawerOpen, docked, imgAltText, imgLogo}) => {
    return (
        <Drawer
            containerClassName="main-drawer flex"
            open={drawerOpen}
            width={320}
            onRequestChange={() => toggleDrawer(!drawerOpen)}
            docked={docked}>
            <div className="layout-fill side-drawer">
                <div className="logo-wrapper">
                    <img src={imgLogo} alt={imgAltText}/>
                </div>
                <List className="main-menu">
                    {menuItems.map((menuItem, index) =>
                            <span className="menu-item-container" key={index}>
                        {menuItem.divider ? (
                            <Divider />
                        ) : (
                            <Link to={menuItem.linkTo}>
                                <ListItem primaryText={menuItem.primaryText}
                                          secondaryText={menuItem.secondaryText}
                                          leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null}
                                />
                            </Link>
                        )}
                    </span>
                    )}
                </List>
            </div>
        </Drawer>
    );
};

MenuDrawer.propTypes = propTypes;
MenuDrawer.defaultProps = defaultProps;

export default MenuDrawer;
