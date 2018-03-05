const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    //Create the browser window.
    win = new BrowserWindow({
        width: 1028,
        height: 950
        //icon: 'file://${_dirname}/dist/assets/logo.png'
    })
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      }))

    //Event fired when window is closed
    win.on('closed', function() {
        win = null;
    })
}

//Create window on Electron initialization
app.on('ready', createWindow)

//Quit when all windows are closed.
app.on('window-all-closed', function() {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function() {
    if (win === null) {
        createWindow()
    }
})