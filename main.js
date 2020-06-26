const { app, BrowserWindow } = require('electron');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    minWidth: 1016,
    minHeight: 639,
    width: 1016,
    height: 639,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
    },
  });

  win.setMenu(null);

  win.loadURL('http://localhost:9000');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
