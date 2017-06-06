import React from 'react';
import PropTypes from 'prop-types';
import AsyncAutoCompleteSelect from '../components/AsyncAutoCompleteSelect.component';

import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

const AsyncAutoCompleteSelectWrapper = props => {
    const filteredProps = propFilter(props, AsyncAutoCompleteSelect.propTypes);
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <AsyncAutoCompleteSelect {...filteredProps} />
            {props.helpText && (
                <div style={{position: 'absolute', right: 0, top: 0}}>
                    <HelpIcon title={props.helpTitle} text={props.helpText} buttonLabel="Got it!" />
                </div>
            )}
        </div>
    );
};

AsyncAutoCompleteSelectWrapper.propTypes = {
    ...AsyncAutoCompleteSelect.propTypes,
    helpTitle: PropTypes.string,
    helpText: PropTypes.any
};

export default AsyncAutoCompleteSelectWrapper;
