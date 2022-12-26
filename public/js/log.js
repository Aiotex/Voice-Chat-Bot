
function errorNotification(message) {
    new Noty({
        layout: 'top',
        type: 'error',
        theme: 'metroui',
        closeWith: ['button'],
        text: message,
        timeout: 5000,
        progressBar: true,
        dismissQueue: true,
        force: false,
        maxVisible: 5,
    }).show();
}