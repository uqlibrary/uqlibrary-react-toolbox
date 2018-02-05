import React from 'react';
import FreeTextListEditor from './components/FreeTextListEditor';

export default function ListEditorField(fieldProps) {
    return(<FreeTextListEditor
        errorText={fieldProps.meta ? fieldProps.meta.error : null}
        onChange={fieldProps.input.onChange}
        {...fieldProps} />);
}
