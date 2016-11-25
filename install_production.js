if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION');

  let util = require('util'),
    spawn = require('child_process').spawn,
    ls = spawn('sequelize', ['db:migrate']);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
