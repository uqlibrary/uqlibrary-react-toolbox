import React from 'react';
import PropTypes from 'prop-types';

// import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
export default function MenuDrawer({menuItems, toggleDrawer, drawerOpen, docked, logoImage, logoText, history}) {
    const onNavigate = (to, target) => {
        if (to.indexOf('http://') === -1) {
            history.push(to);
        } else {
            window.open(to, target);
        }
        toggleDrawer();
    };

    const skipNav = () => {
        // If the main menu isnt docked (large desktop) then toggle its state to hide
        if (!docked) toggleDrawer();
        // Focus on the content container
        document.getElementById('contentContainer').focus();
    };

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
                            {logoImage && <img src={logoImage} alt={logoText} />}
                        </div>
                        <div className="column is-narrow is-hidden-tablet menuCloseButton">
                            <IconButton onTouchTap={toggleDrawer}>
                                <HardwareKeyboardArrowLeft />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <List className="main-menu" id="mainMenu" tabIndex={-1}>
                    <div type="button"
                        className="skipNav"
                        tabIndex={drawerOpen ? 1 : -1}
                        onClick={skipNav.bind(this)}
                        onKeyPress={skipNav.bind(this)}
                        aria-label="Click to skip navigation"
                    >
                        <span className="skipButton">
                            Skip Navigation
                        </span>
                    </div>
                    {menuItems.map((menuItem, index) =>
                        menuItem.primaryText && menuItem.linkTo && (
                            <span className="menu-item-container" key={index}>
                                {menuItem.divider ?
                                    (<Divider/>)
                                    :
                                    (
                                        <ListItem
                                            primaryText={menuItem.primaryText}
                                            secondaryText={menuItem.secondaryText}
                                            onTouchTap={onNavigate.bind(this, menuItem.linkTo, menuItem.target)}
                                            leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null}
                                            tabIndex={drawerOpen ? 2 : -1}
                                        />
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
    history: PropTypes.object.isRequired
};

