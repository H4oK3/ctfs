var Module = require('./functionn.js');
var q = process.argv[2];

ar = Module.main(q).split("|");
var s = "api.php?id=" + encodeURI(q) + "&hash=" + ar[0] + "&time=" + ar[1];
req = "http://202.120.7.213:11181/" + s;

console.log(req);

var spawn = require("child_process").spawn;
var curl = spawn('curl',[req]);

curl.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
});
/*
curl.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
});

curl.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
});
*/
