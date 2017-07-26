import React from 'react';
import PartialDateForm from './components/PartialDateForm';

export default function PartialDateField(fieldProps) {
    return(<PartialDateForm onChange={ fieldProps.input.onChange } {...fieldProps} />);
}
