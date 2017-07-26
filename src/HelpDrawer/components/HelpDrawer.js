import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

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
            <div className="layout-fill side-drawer">
                <div className="content">
                    <span className="title is-5">{title}</span>
                    <div className="body-1">{text}</div>
                </div>
                <div className="layout-padding">
                    <RaisedButton secondary label={buttonLabel} onTouchTap={toggleDrawer} className="is-pulled-right" />
                </div>
            </div>
        </Drawer>
    );
};

HelpDrawer.propTypes = propTypes;
HelpDrawer.defaultProps = defaultProps;

export default HelpDrawer;
