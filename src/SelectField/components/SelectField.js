import React from 'react';
import SelectField from 'material-ui/TextField';
import PropTypes from 'prop-types';


import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

const SelectFieldWrapper = props => {
    const filteredProps = propFilter(props, SelectField.propTypes);
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <SelectField {...filteredProps} />
            {props.helpText && (
                <HelpIcon title={props.helpTitle} text={props.helpText} buttonLabel="Ok" />
            )}
        </div>
    );
};

SelectFieldWrapper.propTypes = {
    ...SelectField.propTypes,
    helpTitle: PropTypes.string,
    helpText: PropTypes.any
};

export default SelectFieldWrapper;
