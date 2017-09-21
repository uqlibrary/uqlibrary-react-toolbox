import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

export default function MenuDrawer({menuItems, toggleDrawer, drawerOpen, docked, logoImage, logoText}) {
    return (
        <Drawer
            containerClassName="main-drawer"
            open={drawerOpen}
            width={320}
            onRequestChange={() => toggleDrawer(!drawerOpen)}
            docked={docked}>
            <div className="layout-fill side-drawer">
                <div className="logo-wrapper">
                    {logoImage && <img src={logoImage} alt={logoText}/>}
                </div>
                <List className="main-menu">
                    {menuItems.map((menuItem, index) =>
                        menuItem.primaryText && menuItem.linkTo && (
                            <span className="menu-item-container" key={index}>
                                {menuItem.divider ?
                                    (<Divider/>)
                                    :
                                    (menuItem.target && menuItem.linkTo.indexOf('http') === -1 ?
                                        (<a href={menuItem.linkTo} target={menuItem.target}>
                                            <ListItem
                                                primaryText={menuItem.primaryText}
                                                secondaryText={menuItem.secondaryText}
                                                onClick={toggleDrawer}
                                                leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null} />
                                        </a>)
                                        :
                                        (<Link to={menuItem.linkTo}>
                                            <ListItem
                                                primaryText={menuItem.primaryText}
                                                secondaryText={menuItem.secondaryText}
                                                onClick={toggleDrawer}
                                                leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null} />
                                        </Link>)
                                    )
                                }
                            </span>
                        )
                    )}
                </List>
            </div>
        </Drawer>
    );
}

MenuDrawer.propTypes = {
    menuItems: PropTypes.array.isRequired,
    logoImage: PropTypes.string,
    logoText: PropTypes.string,
    drawerOpen: PropTypes.bool,
    docked: PropTypes.bool,
    toggleDrawer: PropTypes.func
};

