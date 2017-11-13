import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

const MenuDrawer = ({menuItems, onToggleDrawer, drawerOpen, docked, logoImage,
    logoText, history, locale}) => {
    const focusOnElementId = (elementId) => {
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).focus();
        }
    };
    const navigateToLink = (url, target = '_blank') => {
        if (url && url.indexOf('http') === -1) {
            history.push(url);
        } else if (url && url.indexOf('http') !== -1) {
            window.open(url, target);
        }
        if (!docked) onToggleDrawer();
    };
    const skipMenuItems = () => {
        focusOnElementId('afterMenuDrawer');
    };
    const renderMenuItems = items => (
        items.map((menuItem, index) => (
            menuItem.primaryText && menuItem.linkTo && (
                <span className="menu-item-container" key={`menu_item_${index}`}>
                    {
                        menuItem.divider
                            ? <Divider/>
                            : <ListItem
                                primaryText={menuItem.primaryText}
                                secondaryText={menuItem.secondaryText}
                                onTouchTap={navigateToLink.bind(this, menuItem.linkTo, menuItem.target)}
                                leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null} />
                    }
                </span>
            )
        )));

    const renderSkipNavigation = () => (
        <div className="skipNav"
            id="skipNav"
            tabIndex={1}
            onClick={skipMenuItems}
            onKeyPress={skipMenuItems}
            aria-label={locale.skipNavAriaLabel}>
            <RaisedButton
                secondary
                className="skipNavButton"
                label={locale.skipNavTitle}
                onTouchTap={skipMenuItems}
                tabIndex={-1}/>
        </div>
    );

    if (drawerOpen && !docked) {
        // set focus on menu on mobile view if menu is opened
        setTimeout(focusOnElementId.bind(this, 'mainMenu'), 0);
    }

    return (
        <Drawer
            containerClassName="main-drawer"
            open={drawerOpen}
            width={320}
            onRequestChange={onToggleDrawer}
            docked={docked}>
            <div className="layout-fill side-drawer">
                <div className="logo-wrapper">
                    <div className="columns is-gapless is-mobile">
                        <div className="column is-centered">
                            {logoImage && <img src={logoImage} alt={logoText}/>}
                        </div>
                        <div className="column is-narrow is-hidden-tablet menuCloseButton">
                            <IconButton onTouchTap={onToggleDrawer} aria-label={locale.closeMenuLabel}>
                                <HardwareKeyboardArrowLeft/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <List className="main-menu" id="mainMenu" tabIndex={-1}>
                    {
                        docked && renderSkipNavigation()
                    }
                    {
                        drawerOpen && renderMenuItems(menuItems)
                    }
                </List>
            </div>
            <div id="afterMenuDrawer" tabIndex={-1} />
        </Drawer>
    );
};

MenuDrawer.propTypes = {
    menuItems: PropTypes.array.isRequired,
    logoImage: PropTypes.string,
    logoText: PropTypes.string,
    drawerOpen: PropTypes.bool,
    docked: PropTypes.bool,
    onToggleDrawer: PropTypes.func,
    history: PropTypes.object.isRequired,
    locale: PropTypes.shape({
        skipNavTitle: PropTypes.string,
        skipNavAriaLabel: PropTypes.string,
        closeMenuLabel: PropTypes.string
    })
};

MenuDrawer.defaultValues = {
    locale: {
        skipNavTitle: 'Skip navigation',
        skipNavAriaLabel: 'Skip navigation',
        closeMenuLabel: 'Close menu'
    }
};

export default withRouter(MenuDrawer);


