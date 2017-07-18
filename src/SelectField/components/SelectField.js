import React from 'react';
import SelectField from 'material-ui/SelectField';
import PropTypes from 'prop-types';


import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

const SelectFieldWrapper = props => {
    const filteredProps = propFilter(props, SelectField.propTypes);
    filteredProps.onChange = (event, index, value) => props.input.onChange(value);
    filteredProps.onBlur = () => props.input.onBlur(props.input.value);
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <SelectField {...filteredProps} />
            {props.help && props.help.text && <HelpIcon {...props.help} />}
        </div>
    );
};

SelectFieldWrapper.propTypes = {
    ...SelectField.propTypes,
    help: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.any,
        buttonLabel: PropTypes.string
    })
};

SelectFieldWrapper.defaultProps = {
    dropDownMenuProps: {animated: false},
    maxHeight: 250
};

export default SelectFieldWrapper;
