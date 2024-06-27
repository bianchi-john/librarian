const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      icon: './media/icons/icon.ico',
    })
  
    win.loadFile('index.html')
  }
  app.whenReady().then(() => {
    createWindow()
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  // The next three lines are usefoul to not get a strnge ubuntu error described here:
  // https://github.com/electron/electron/issues/32760
  app.commandLine.appendSwitch('ignore-gpu-blacklist');
  app.commandLine.appendSwitch('disable-gpu');
  app.commandLine.appendSwitch('disable-gpu-compositing');




// **************************************************** //
// *********************** CSV ************************ //
// **************************************************** //

// READ //

const rd = require('fs')
let csv = require('fast-csv');
const dataIn = []

rd.createReadStream('./data/data.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', row => dataIn.push(row))
  .on('end', () => console.log(dataIn));


// WRITE //
// Vediti il sito
// https://code-boxx.com/write-csv-nodejs/

//(A) LOAD REQUIRED MODULES
csv = require("csv-stringify");

// (B) DATA TO WRITE
var dataOut = [
  ["Apple", "Banana"],
  ["Cherry", "Durian"],
  ["Elderberry", "Fig"]
];

// (C) APPEND DATA INTO CSV FILE
csv.stringify(dataOut, (err, output) => {
  rd.appendFile('./data/data.csv', output, 'utf8', () => {});
  console.log("OK");
});