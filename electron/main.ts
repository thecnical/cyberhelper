import { app, BrowserWindow, ipcMain, shell } from 'electron';
import * as path from 'path';
import Store from 'electron-store';

const store = new Store({
  encryptionKey: 'cyberhelper-secure-key-2026',
});

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#0d0d0d',
    icon: path.join(__dirname, '../../assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0d0d0d',
      symbolColor: '#ffffff',
      height: 40,
    },
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers for secure storage
ipcMain.handle('store:get', (_event, key: string) => {
  return (store as any).get(key);
});

ipcMain.handle('store:set', (_event, key: string, value: any) => {
  (store as any).set(key, value);
  return true;
});

ipcMain.handle('store:delete', (_event, key: string) => {
  (store as any).delete(key);
  return true;
});

ipcMain.handle('store:clear', () => {
  (store as any).clear();
  return true;
});

// Window controls
ipcMain.handle('window:minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('window:close', () => {
  mainWindow?.close();
});