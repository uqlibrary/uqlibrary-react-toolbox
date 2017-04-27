import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import './HelpDrawer.scss';

const propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.any.isRequired,
    hide: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string
};

const defaultProps = {
    buttonLabel: 'OK'
};

const HelpDrawer = ({title, text, buttonLabel, open, hide}) => {
    const toggleDrawer = () => {
        hide();
    };

    return (
        <Drawer
            containerClassName="help-drawer"
            open={open}
            openSecondary
            docked={false}
            disableSwipeToOpen
            width={380}
            onRequestChange={toggleDrawer}>
            <div className="layout-fill side-drawer columns">
                <div className="flex column content">
                    <h1 className="headline">{title}</h1>
                    <Divider style={{padding: '10px 0'}} />
                    <div className="subhead">{text}</div>
                </div>
                <div className="columns layout-padding is-pulled-right">
                    <RaisedButton secondary label={buttonLabel} onTouchTap={toggleDrawer} />
                </div>
            </div>
        </Drawer>
    );
};

HelpDrawer.propTypes = propTypes;
HelpDrawer.defaultProps = defaultProps;

export default HelpDrawer;
