import React from 'react';
import PropTypes from 'prop-types';

export default function StandardPage({title, className, children}) {
    return (
        <div className={`layout-fill ${className}`}>
            <h1 className="title is-3">{title}</h1>
            <div className="layout-card">
                {children}
            </div>
        </div>
    );
}

StandardPage.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};
