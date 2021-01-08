window.addEventListener('load', function() {
    setTimeout(() => {
        alt.emit('ready');
    }, 1000);
});
if ('alt' in window) {
    alt.on('menu', (enabled) => {
        app.keyword = '';
        app.visible = enabled;
    });
}