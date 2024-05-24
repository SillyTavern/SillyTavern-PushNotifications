import { substituteParams } from '../../../../script.js';

Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        const { eventSource, event_types } = window['SillyTavern'].getContext();
        eventSource.on(event_types.MESSAGE_RECEIVED, (messageId) => {
            // if window is focused, don't show notification
            if (document.hasFocus()) return;

            const context = window['SillyTavern'].getContext();
            const message = context.chat[messageId];

            if (!message || message.mes === '' || message.mes === '...' || message.is_user) return;

            const avatar = message.force_avatar ?? `/thumbnail?type=avatar&file=${encodeURIComponent(context.characters[context.characterId]?.avatar)}`;

            const notification = new Notification(message.name, {
                body: substituteParams(message.mes),
                icon: location.origin + avatar,
            });

            notification.onclick = () => {
                window.focus();
            };

            setTimeout(notification.close.bind(notification), 10000);
        });
    } else {
        console.warn('Notifications not allowed');
    }
});
