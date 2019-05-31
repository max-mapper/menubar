const { menubar } = require('../../lib');

const mb = menubar();

mb.on('ready', () => {
  console.log('Menubar app is ready.');
});
