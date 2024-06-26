const { menubar } = require('../..');

const mb = menubar();

mb.on('ready', () => {
  console.log('Menubar app is ready.');
});
