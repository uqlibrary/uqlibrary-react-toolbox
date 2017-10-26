import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

const TextFieldWrapper = props => {
    const filteredProps = propFilter(props, TextField.propTypes);
    delete filteredProps.className;
    const classProps = props.className ? props.className + ' input-long-hint' : 'input-long-hint';
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <TextField {...filteredProps} className={classProps} />
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
        text: PropTypes.any,
        buttonLabel: PropTypes.string
    })
};

export default TextFieldWrapper;
