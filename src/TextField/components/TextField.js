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
            {props.help && props.help.text && (
                <HelpIcon {...props.help} />
            )}
        </div>
    );
};

TextFieldWrapper.propTypes = {
    ...TextField.propTypes,
    help: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.object,
        buttonLabel: PropTypes.string
    })
};

export default TextFieldWrapper;
