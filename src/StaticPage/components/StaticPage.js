import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardText, CardHeader} from 'material-ui/Card';
import {HelpIcon} from '../../index';

export default function StaticPage({title, cardtitle, text, help}) {
    return (

        <div className="layout-fill">

            <h1 className="title is-3">{title ? title : 'This is the page title'}</h1>

            <Card className="layout-card">
                <CardHeader className="card-header">
                    <div className="columns is-gapless is-mobile">

                        <div className="column">
                            {cardtitle && (
                            <h2 className="title is-4">cardtitle</h2>
                            )}
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
    cardtitle: PropTypes.string,
    text: PropTypes.string.isRequired,
    help: PropTypes.object
};

StaticPage.defaultProps = {};
