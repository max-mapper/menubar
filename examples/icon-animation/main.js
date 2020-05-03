const { menubar } = require('../..');

const mb = menubar();

mb.on('ready', () => {
  setOkIcon()
  const trayAnimation = setInterval(frame, 1000);
  // simulate data fetching
  sleep(3000).then(() => {
    clearInterval(trayAnimation);
    setOkIcon()
  })
});

function setOkIcon() {
  mb.tray.setImage('state-ok-20.png')
}

function frame() {
  setTimeout(() => mb.tray.setImage('state-sync-20.png'), 300)
  setTimeout(() => mb.tray.setImage('state-sync-20-60.png'), 600)
  setTimeout(() => mb.tray.setImage('state-sync-20-120.png'), 900)
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
