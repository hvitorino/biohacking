if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION')

  var util  = require('util'),
      spawn = require('child_process').spawn,
      ls    = spawn('sequelize', ['db:migrate']);

  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });

}
