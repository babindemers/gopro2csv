const gpmfExtract = require('gpmf-extract');
const goproTelemetry = require('gopro-telemetry');
const fs = require('fs');

const matlab_path = 'C:/Users/willi/OneDrive/Documents/MATLAB/Stage/data/'

const file = fs.readFileSync('./input/20.MP4');

gpmfExtract(file)
  .then(extracted => {
    let telemetry = goproTelemetry(extracted, {stream: ['ACCL', 'GYRO', 'CORI'], preset: 'csv', timeOut: 'cts'});
    fs.writeFileSync(matlab_path + '/accl.csv', telemetry['HERO8 Black-ACCL']);
    fs.writeFileSync(matlab_path + '/gyro.csv', telemetry['HERO8 Black-GYRO']);
    fs.writeFileSync(matlab_path + '/cori.csv', telemetry['HERO8 Black-CORI']);
    console.log('Telemetry saved as CSV');
  })
  .catch(error => console.log(error));

