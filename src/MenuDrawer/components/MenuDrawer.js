import React from 'react';
import PropTypes from 'prop-types';
import {SkipNavigation} from './SkipNavigation';
import {List, ListItem} from 'material-ui/List';
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
            menuItem.divider
                ? <Divider key={`menu_item_${index}`}/>
                : <span className="menu-item-container" key={`menu_item_${index}`}>
                    <ListItem
                        primaryText={menuItem.primaryText}
                        secondaryText={menuItem.secondaryText}
                        onTouchTap={navigateToLink.bind(this, menuItem.linkTo, menuItem.target)}
                        leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null}/>
                </span>
        )));

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
            {
                drawerOpen &&
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
                            docked &&
                            <SkipNavigation onClick={skipMenuItems} locale={locale}/>
                        }
                        {
                            renderMenuItems(menuItems)
                        }
                    </List>
                    <div id="afterMenuDrawer" tabIndex={-1} />
                </div>
            }
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

export default MenuDrawer;
