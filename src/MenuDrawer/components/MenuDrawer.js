import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

export default function MenuDrawer({menuItems, toggleDrawer, drawerOpen, docked, logoImage, logoText, isMobile}) {
    console.log('Is this mobile? : ' + isMobile);
    return (
        <Drawer
            containerClassName="main-drawer"
            open={drawerOpen}
            width={320}
            onRequestChange={() => toggleDrawer(!drawerOpen)}
            docked={docked}>
            <div className="layout-fill side-drawer">
                <div className="logo-wrapper">
                    <div className="columns is-gapless is-mobile">
                        <div className="column is-centered">
                            {logoImage && <img src={logoImage} alt={logoText}/>}
                        </div>
                        <div className="column is-narrow is-hidden-tablet menuCloseButton">
                            <IconButton onTouchTap={toggleDrawer}>
                                <HardwareKeyboardArrowLeft />
                            </IconButton>
                        </div>
                    </div>
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
    toggleDrawer: PropTypes.func,
    isMobile: PropTypes.any
};

