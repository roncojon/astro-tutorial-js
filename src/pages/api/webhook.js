export const prerender = false;

// api/webhook.js
const { spawn } = require('child_process');


module.exports = (req, res) => {
  // Handle POST request from backend
  if (req.method === 'POST') {
    // Trigger a build of the frontend project
    const buildProcess = spawn('vercel', ['deploy'], { shell: true });

    buildProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    buildProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    buildProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      res.status(200).json({ message: 'Build triggered successfully' });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
