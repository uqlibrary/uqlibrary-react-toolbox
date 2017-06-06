import React from 'react';
import PropTypes from 'prop-types';
import AsyncAutoCompleteSelect from '../components/AsyncAutoCompleteSelect.component';

import filterProps from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

const AutoCompleteSelectWrapper = props => {
    const filteredProps = filterProps(props, AsyncAutoCompleteSelect.propTypes);
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

AutoCompleteSelectWrapper.propTypes = {
    ...AsyncAutoCompleteSelect.propTypes,
    helpTitle: PropTypes.string,
    helpText: PropTypes.any
};

export default AutoCompleteSelectWrapper;
