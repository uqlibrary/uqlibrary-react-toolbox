import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardText, CardHeader} from 'material-ui/Card';
import {HelpIcon} from '../../index';

export default function StandardCard({title, help, children}) {
    return (
        <Card className="layout-card">
            {title &&
            <CardHeader className="card-header">
                <div className="columns is-gapless is-mobile">
                    <div className="column">
                        <h2 className="title is-4">{title}</h2>
                    </div>
                    {help && help.text &&
                    <div className="column is-narrow is-helpicon">
                        <HelpIcon {...help}/>
                    </div>
                    }
                </div>
            </CardHeader>
            }

            <CardText className="body-1">
                <div>
                    {children}
                </div>
            </CardText>

        </Card>
    );
}

StandardCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    help: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        buttonLabel: PropTypes.string
    })
};
