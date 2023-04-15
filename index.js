const fs = require('fs');
const process = require('process');
const nome = process.argv.slice(2)[0];
const link = process.argv.slice(2)[1];
const { spawn } = require('child_process')

const obj = JSON.parse(fs.readFileSync('./index.html'));
obj[nome] = link;
fs.writeFileSync('./index.html', JSON.stringify(obj));

setTimeout(() => {
    const id = parseInt(fs.readFileSync('./id.txt'));
    const comando = process.platform === 'win32' ? 'cmd' : 'bash';
    const argumentos = process.platform === 'win32' ? ['/c', 'cd', __dirname, '&&', 'git', 'add', '.', '&&', 'git', 'commit', '-m', `"ID: ${id}"`, "&&", 'git', 'push', 'origin', 'main'] : ['-c', `cd ${__dirname} && git add . && git commit -m "ID ${id}" && git push origin main`];
    const childProcess = spawn(comando, argumentos, { detached: true, stdio: 'ignore' });
    childProcess.on('exit', function() {
        console.log('Finalizado.')
        fs.writeFileSync('./id.txt', (id + 1).toString());
    })
})