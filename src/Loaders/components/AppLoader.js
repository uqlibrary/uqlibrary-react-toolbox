import React from 'react';
import {PropTypes} from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import './AppLoader.scss';

export default function AppLoader({title, logoImage, logoText, progressColor}) {
    return (
        <div className="app-loader column layout-fill align-center justify-center">
            <h1 className="display-2">{title}</h1>
            <br />
            <br />
            <CircularProgress size={80} thickness={8} color={progressColor} />
            <br />
            <br />
            {logoImage && <img src={logoImage} alt={logoText} />}
        </div>
    );
}

AppLoader.propTypes = {
    title: PropTypes.string.isRequired,
    logoImage: PropTypes.string,
    logoText: PropTypes.string,
    progressColor: PropTypes.string
};

AppLoader.defaultProps = {
    progressColor: '#FFF'
};
