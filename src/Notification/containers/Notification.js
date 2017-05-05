import {connect} from 'react-redux';
import Notification from '../components/Notification';

const NotificationContainer = connect((state) => {
    return {
        notifcationDetails: state.get('notification').get('notificationList')
    };
})(Notification);

export default NotificationContainer;
