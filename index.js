const gpmfExtract = require('gpmf-extract');
const goproTelemetry = require('gopro-telemetry');
const fs = require('fs');

const matlab_path = 'C:/Users/willi/OneDrive/Documents/MATLAB/Stage/'

const file = fs.readFileSync(matlab_path + '/video/20.MP4');

gpmfExtract(file)
  .then(extracted => {
    let telemetry = goproTelemetry(extracted, {stream: ['ACCL', 'GYRO', 'CORI'], preset: 'csv', timeOut: 'cts'});
    fs.writeFileSync(matlab_path + 'data/accl.csv', telemetry['HERO8 Black-ACCL']);
    fs.writeFileSync(matlab_path + 'data/gyro.csv', telemetry['HERO8 Black-GYRO']);
    fs.writeFileSync(matlab_path + 'data/cori.csv', telemetry['HERO8 Black-CORI']);
    console.log('Telemetry saved as CSV');
  })
  .catch(error => console.log(error));

