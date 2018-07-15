'use strict';

// const ipc = require('ipc');
const {app, BrowserWindow, ipcMain} = require('electron');
// const quizOperations = require('./src/quiz/quiz-operations.js');
// const rosterOperations = require('./src/roster/roster-operations.js');
// const foo = require('./src/anotherwindow/another-window-operations.js').foo;
// const bar = require('./src/anotherwindow/another-window-operations.js').bar;

//mangage all windows in the main.js
// best practice to wrap everything in the app.on('ready', )

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function mainWindow() {
  win = new BrowserWindow({
    width: 900, 
    height: 600,
    // show: false,
  });
  win.loadFile('./src/pages/home.html');

  // win.loadURL('http://code-commando.herokuapp.com/');

  // win.loadURL('http://localhost:3000');

}
  
app.on('ready', mainWindow); // npm start

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
  
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    mainWindow();
  }
});

//make DRY
ipcMain.on('load-home', () => {
  win.loadFile('./src/pages/home.html');
});
ipcMain.on('load-quiz', () => {
  win.loadFile('./src/pages/quiz.html');
});
ipcMain.on('load-roster', () => {
  win.loadFile('./src/pages/roster.html');
});
ipcMain.on('load-random', () => {
  win.loadFile('./src/pages/random.html');
});
ipcMain.on('load-pairs', () => {
  win.loadFile('./src/pages/pairs.html');
});
ipcMain.on('load-code', () => {
  win.loadFile('./src/pages/code.html');
});