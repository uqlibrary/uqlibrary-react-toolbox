import React from 'react';

import AutoCompleteSelect from '../components/AsyncAutoCompleteSelect';
import filterProps from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

export default function UQAutoCompleteSelect(props) {
    const consolidatedProps = filterProps(props, AutoCompleteSelect.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return (
        <div className="flex column">
            <div style={{position: 'relative', width: '100%'}}>
                <AutoCompleteSelect {...consolidatedProps} />
                {props.helpText && (
                    <HelpIcon title={props.helpTitle} text={props.helpText} style={{right: 16}} buttonLabel="autocomplete" />
                )}
            </div>
            {consolidatedProps.error && (
                <div className="errorLabel body-2">
                    {consolidatedProps.errorText}
                </div>
            )}
        </div>
    );
}

UQAutoCompleteSelect.propTypes = {
    ...AutoCompleteSelect.propTypes,
    helpTitle: React.PropTypes.string,
    helpText: React.PropTypes.any
};
