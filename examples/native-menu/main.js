const { app, Menu, Tray } = require('electron');
const path = require('path');

const { menubar } = require('../../');

const iconPath = path.join(__dirname, '..', '..', 'assets', 'IconTemplate.png');

app.on('ready', () => {
  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray
  });

  mb.on('ready', () => {
    console.log('Menubar app is ready.');
    // your app code here
  });
});
