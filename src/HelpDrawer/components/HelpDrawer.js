import React from 'react';
import {PropTypes} from 'prop-types';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

// import './HelpDrawer.scss';

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
            containerClassName="help-drawer flex"
            open={open}
            openSecondary
            docked={false}
            disableSwipeToOpen
            width={380}
            onRequestChange={toggleDrawer}>
            <div className="layout-fill side-drawer column align-stretch">
                <div className="flex column content">
                    <h1 className="headline">{title}</h1>
                    <Divider />
                    <div className="subhead">{text}</div>
                </div>
                <div className="row justify-end layout-padding">
                    <RaisedButton secondary label={buttonLabel} onTouchTap={toggleDrawer} />
                </div>
            </div>
        </Drawer>
    );
};

HelpDrawer.propTypes = propTypes;
HelpDrawer.defaultProps = defaultProps;

export default HelpDrawer;
