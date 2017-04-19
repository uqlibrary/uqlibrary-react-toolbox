import React from 'react';

import AutoCompleteSelect from '../components/AutoCompleteSelect';
import filterProps from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

export default function AutoCompleteSelectWrapper(props) {
    const consolidatedProps = filterProps(props, AutoCompleteSelect.propTypes);
    consolidatedProps.onTouchTap = props.input ? props.input.onBlur : null;
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

AutoCompleteSelectWrapper.propTypes = {
    ...AutoCompleteSelect.propTypes,
    helpTitle: React.PropTypes.string,
    helpText: React.PropTypes.any
};
