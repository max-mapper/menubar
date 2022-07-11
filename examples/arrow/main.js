const { menubar } = require('../..');

const mb = menubar({
	browserWindow: { 
		transparent: true,
		width: 350,
		height: 550
	 },
});

mb.on('ready', () => {
	console.log('Menubar app is ready.');
});
