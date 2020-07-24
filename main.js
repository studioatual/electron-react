const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const child = require('child_process').execFile;
const { spawn } = require('child_process');

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

require('electron-reload')(`${__dirname}/dist`, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

let win;

ipcMain.on('open_exec', (e, args) => {
  child(args.path, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.toString());
  });
});

ipcMain.on('monitor', (e, args) => {
  const monitor = spawn(args.path, []);
  win.webContents.send('monitor.get', { status: 'open' });

  monitor.on('close', (code) => {
    win.webContents.send('monitor.get', { status: 'close' });
  });
});

const createWindow = () => {
  win = new BrowserWindow({
    minWidth: 1016,
    minHeight: 639,
    width: 1016,
    height: 639,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  win.setMenu(null);

  win.loadFile('./dist/index.html');

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
