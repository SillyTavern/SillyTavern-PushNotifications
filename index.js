Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        const { eventSource, event_types } = window['SillyTavern'].getContext();
        eventSource.on(event_types.MESSAGE_RECEIVED, (messageId) => {
            // if window is focused, don't show notification
            if (document.hasFocus()) return;

            const context = window['SillyTavern'].getContext();
            const message = context.chat[messageId];

            if (!message || message.mes === '' || message.mes === '...') return;

            const notification = new Notification('SillyTavern - ' + message.name, {
                body: message.mes,
                icon: location.origin + message.avatar,
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
