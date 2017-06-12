import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

export default function ToggleWrapper(props) {
    const filteredProps = propFilter(props, Toggle.propTypes);
    delete filteredProps.errorText;

    return (
        <div style={{position: 'relative', width: '100%'}}>
            <Toggle {...filteredProps} />
            {props.helpText && (
                <div style={{position: 'absolute', top: '20px', right: 0}}>
                    <HelpIcon title={props.helpTitle} text={props.helpText} buttonLabel="Got it!" />
                </div>
            )}
        </div>
    );
}

ToggleWrapper.propTypes = {
    ...Toggle.propTypes,
    helpTitle: PropTypes.string,
    helpText: PropTypes.any
};
