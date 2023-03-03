const { spawn } = require('child_process');
const child_process = require('child_process');

const runPlaybook = () => {
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
    console.log(output);
  });
};
