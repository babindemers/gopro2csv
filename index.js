const gpmfExtract = require('gpmf-extract');
const goproTelemetry = require('gopro-telemetry');
const fs = require('fs');


const matlab_path = 'C:/Users/willi/OneDrive/Bureau/Stage/gopro_tug/';
const video_name = 'TUG2';
const video_type = '.MP4';
const file = fs.readFileSync(matlab_path + 'video/' + video_name + video_type);

gpmfExtract(file)
  .then(extracted => {
    let telemetry = goproTelemetry(extracted, {stream: ['ACCL', 'GYRO', 'CORI'], preset: 'csv', timeOut: 'cts'});
    fs.writeFileSync(matlab_path + 'data/' + video_name + '_accl.csv', telemetry['HERO8 Black-ACCL']);
    fs.writeFileSync(matlab_path + 'data/'  + video_name + '_gyro.csv', telemetry['HERO8 Black-GYRO']);
    fs.writeFileSync(matlab_path + 'data/'  + video_name +  '_cori.csv', telemetry['HERO8 Black-CORI']);
    console.log('Telemetry saved as CSV');
  })
  .catch(error => console.log(error));

