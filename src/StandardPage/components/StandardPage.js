import React from 'react';
import PropTypes from 'prop-types';

export default function StandardPage({title, children}) {
    return (
        <div className="layout-fill">
            <h1 className="title is-3">{title}</h1>
            {children}
        </div>
    );
}

StandardPage.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element

};
