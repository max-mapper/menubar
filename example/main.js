const menubar = require('@amaurymartiny/menubar');

const mb = menubar();

mb.on('ready', () => {
  console.log('Menubar app is ready.');
});
