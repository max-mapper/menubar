const { menubar } = require('../..');

const mb = menubar({
	browserWindow: { transparent: true },
});

mb.on('ready', () => {
	console.log('Menubar app is ready.');
});
