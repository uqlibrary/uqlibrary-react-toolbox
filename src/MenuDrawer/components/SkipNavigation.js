import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export const SkipNavigation = (onClick, locale) => (
    <div className="skipNav"
        id="skipNav"
        tabIndex={1}
        onClick={onClick}
        onKeyPress={onClick}
        aria-label={locale.skipNavAriaLabel}>
        <RaisedButton
            secondary
            className="skipNavButton"
            label={locale.skipNavTitle}
            onTouchTap={onClick}
            tabIndex={-1}/>
    </div>
);

SkipNavigation.propTypes = {
    onClick: PropTypes.func,
    locale: PropTypes.shape({
        skipNavTitle: PropTypes.string,
        skipNavAriaLabel: PropTypes.string,
    })
};

SkipNavigation.defaultValues = {
    locale: {
        skipNavTitle: 'Skip navigation',
        skipNavAriaLabel: 'Skip navigation'
    }
};
