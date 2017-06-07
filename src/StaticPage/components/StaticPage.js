import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardText, CardHeader} from 'material-ui/Card';
import {HelpIcon} from '../../index';

export default function StaticPage({title, text, help}) {
    return (

        <div className="layout-fill">

            <h1 className="page-title display-1">{title ? title : 'This is the page title'}</h1>

            <Card className="layout-card">
                <CardHeader className="card-header">
                    <div className="columns is-gapless">

                        <div className="column">
                            <h2 className="headline">{title ? title : 'This is the card title'}</h2>
                        </div>

                        <div className="column is-narrow is-helpicon">
                            {help && (
                                <HelpIcon
                                    title={help.title}
                                    text={help.text}
                                    buttonLabel={help.button}
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardText className="body-1">
                    <br />
                    <div>
                        {text ? text : 'This is the default card content'}
                    </div>
                </CardText>

            </Card>
        </div>

    );
}

StaticPage.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    help: PropTypes.object
};

StaticPage.defaultProps = {};
