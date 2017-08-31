import React from 'react';
import PropTypes from 'prop-types';
import {HelpIcon} from '../../index';

export default function StandardRighthandCard({title, children, help}) {
    return (
        <div className="StandardRighthandCard">
            <div className="columns is-gapless is-mobile facetsTitle">
                <div className="column">
                    {title && <h2 className="title is-5">{title}</h2>}
                </div>
                {help && help.text &&
                <div className="column is-narrow is-helpicon">
                    <HelpIcon {...help}/>
                </div>
                }
            </div>
            {children}
        </div>
    );
}

StandardRighthandCard.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    help: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.any,
        buttonLabel: PropTypes.string
    })
};
