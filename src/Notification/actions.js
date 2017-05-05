// Types
export const NOTIFICATION_DISPLAYED = 'NOTIFICATION_DISPLAYED';

/**
 * Displayed the notification with the custom message
 * @returns {{type: string, payload: string}}
 */
export function loadNotification(message) {
    return {
        type: NOTIFICATION_DISPLAYED,
        payload: {
            isOpen: true,
            message: message
        }
    };
}
