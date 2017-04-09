"use strict";

const electron      = require("electron");
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;


/*全てのウィンドウが閉じたら終了*/
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


/*Electronの初期化完了後に実行*/
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width : 1000, 
    height: 700,
    webPreferences: {
      nodeIntegration: false
    },
    resizable:false
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
