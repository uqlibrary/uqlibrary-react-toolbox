import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';


import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

const TextFieldWrapper = props => {
    const filteredProps = propFilter(props, TextField.propTypes);
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <TextField {...filteredProps} />
            {props.helpText && (
                <HelpIcon title={props.helpTitle} text={props.helpText} buttonLabel="Ok" />
            )}
        </div>
    );
};

TextFieldWrapper.propTypes = {
    ...TextField.propTypes,
    helpTitle: PropTypes.string,
    helpText: PropTypes.any
};

export default TextFieldWrapper;
