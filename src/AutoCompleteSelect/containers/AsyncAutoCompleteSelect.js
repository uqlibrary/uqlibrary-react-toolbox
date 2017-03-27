import React from 'react';

import AsyncAutoCompleteSelect from '../components/AsyncAutoCompleteSelect';
import filterProps from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';

export default function AsyncAutoCompleteSelectWrapper(props) {
    const consolidatedProps = filterProps(props, AsyncAutoCompleteSelect.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return (
        <div className="flex column">
            <div style={{position: 'relative', width: '100%'}}>
                <AsyncAutoCompleteSelect {...consolidatedProps} />
                {props.helpText && (
                    <HelpIcon title={props.helpTitle} text={props.helpText} style={{right: 16}} />
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

AsyncAutoCompleteSelectWrapper.propTypes = {
    ...AsyncAutoCompleteSelect.propTypes,
    helpTitle: React.PropTypes.string,
    helpText: React.PropTypes.any
};
