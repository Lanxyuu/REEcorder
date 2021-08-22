const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
  // Create the browser window.     
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });


  // and load the index.html of the app.     
  win.loadURL('http://localhost:3000/');
}

app.on('ready', createWindow)
