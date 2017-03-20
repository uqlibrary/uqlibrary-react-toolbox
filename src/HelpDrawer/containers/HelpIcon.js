import {connect} from 'react-redux';

import HelpIcon from '../components/HelpIcon';
import {show} from '../actions';

const HelpIconContainer = connect(undefined, dispatch => {
    return {
        onClick: (title, text) => dispatch(show(title, text))
    };
})(HelpIcon);

export default HelpIconContainer;
