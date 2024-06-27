const { app, BrowserWindow } = require('electron');
const path = require('path');
const { readCSV, writeCSV } = require('./modules/csvHandler'); // Importa le funzioni dal nuovo file

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'media', 'icons', 'icon.ico'),
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Risolvi l'errore di Ubuntu
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');

