import React from 'react';
import PropTypes from 'prop-types';

// import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

export default function MenuDrawer({menuItems, toggleDrawer, drawerOpen, docked, logoImage, logoText, history, skipNavTitle, skipNavAriaLabel, SkipNavFocusElementId}) {
    const onNavigate = (url, target) => {
        url.indexOf('http') === -1 ? history.push(url) : window.open(url, target);
        SkipNavFocusElementId && document.getElementById(SkipNavFocusElementId).focus();
        !docked && toggleDrawer();
    };
    const skipNav = () => {
        SkipNavFocusElementId && document.getElementById(SkipNavFocusElementId).focus();
        !docked && toggleDrawer();
    };

    (drawerOpen && !docked) && window.setTimeout(() => {
        document.getElementById('mainMenu').focus();
    }, 0);

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
                                <HardwareKeyboardArrowLeft/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <List className="main-menu" id="mainMenu" tabIndex={-1}>
                    <div type="button"
                        className="skipNav"
                        id="skipNav"
                        tabIndex={docked ? 1 : -1}
                        onClick={skipNav.bind(this)}
                        onKeyPress={skipNav.bind(this)}
                        aria-label={skipNavAriaLabel}>
                        <RaisedButton
                            secondary
                            className="skipNavButton"
                            label={skipNavTitle}
                            onTouchTap={skipNav.bind(this)}
                            tabIndex={-1}
                        />
                    </div>
                    {drawerOpen &&
                    menuItems.map((menuItem, index) =>
                        menuItem.primaryText && menuItem.linkTo && (
                            <span className="menu-item-container" key={index}>
                                {menuItem.divider ?
                                    (<Divider/>)
                                    :
                                    (<ListItem
                                        primaryText={menuItem.primaryText}
                                        secondaryText={menuItem.secondaryText}
                                        onTouchTap={onNavigate.bind(this, menuItem.linkTo, menuItem.target)}
                                        leftIcon={menuItem.leftIcon ? menuItem.leftIcon : null}
                                        tabIndex={2}
                                    />)
                                }
                            </span>
                        )
                    )
                    }
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
    history: PropTypes.object.isRequired,
    skipNavTitle: PropTypes.string,
    skipNavAriaLabel: PropTypes.string,
    SkipNavFocusElementId: PropTypes.string
};

