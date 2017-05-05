import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

export default class Notification extends React.Component {

    static propTypes = {
        notifcationDetails: PropTypes.object,
        duration: PropTypes.number
    };

    static defaultProps = {
        duration: 4000
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Snackbar
                className="notification"
                open={this.props.notifcationDetails.get('isOpen') || false}
                message={this.props.notifcationDetails.get('message') || ''}
                autoHideDuration={this.props.duration}
            />
        );
    }
}
