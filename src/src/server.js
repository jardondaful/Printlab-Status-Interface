const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.get('/playbook-output', (req, res) => {
  const ansible = spawn('ansible-playbook', ['checking_status.yml']);

  let output = '';

  ansible.stdout.on('data', (data) => {
    output += data;
  });

  ansible.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  ansible.on('close', (code) => {
    console.log(`Playbook exited with code ${code}`);
    res.send(output);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
