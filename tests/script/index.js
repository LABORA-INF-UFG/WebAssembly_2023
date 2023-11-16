const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { spawn } = require('node:child_process');

async function getGitUser() {
    const nameOutput = await exec('git config --global user.name')
    const emailOutput = await exec('git config --global user.email')

    return {
        name: nameOutput.stdout.trim(),
        email: emailOutput.stdout.trim()
    }
};

async function getProcessStatus() {
    const processStatus = await exec('ps');

    return processStatus.stdout
        .trim()
        .split('\n')
        .filter((value, index) => index > 0)
        .map(processStr => processStr
            .trim()
            .split(' ')
        )
        .map(processArray => {
            return {
                pid: processArray[0],
                tty: processArray[1],
                time: processArray[5],
                cmd: processArray[6],
                params: processArray[7]
            }
        });
};

async function getCurrentDirectory() {
    const currentDirectory = await exec('pwd')

    return currentDirectory.stdout.trim();
};

function changeDirectory(path) {
    process.chdir(path)
}

async function kill(pid) {
    await exec('kill -9 ' + pid);
}

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

// const serverPath = '/mnt/c/Users/mathe/Programming/WebAssembly_2023/offloading/server';
// const clientPath = '/mnt/c/Users/mathe/Programming/WebAssembly_2023/tests/puppeteer';

const serverPath = 'C:\\Users\\mathe\\Programming\\WebAssembly_2023\\offloading\\server';
const clientPath = 'C:\\Users\\mathe\\Programming\\WebAssembly_2023\\tests\\puppeteer';

(async () => {
    changeDirectory(serverPath);

    const server = spawn('node', ["serve.js"]);

    server.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    server.stderr.on('data', (data) => {
        //TODO
    });

    server.on('close', (code) => {
        console.log(`Closing server, status code: ${code}`);
    });

    server.on('spawn', async () => {
        changeDirectory(clientPath);

        console.log("Starting measurement");

        const {stderr} = await exec("node test.js");
        
        if(stderr) {
            //TODO
        }

        console.log("Finishing measurement");
    
        server.kill();
    });
})()

module.exports = {
    getGitUser,
    getCurrentDirectory,
    changeDirectory,
    getProcessStatus,
    kill,
    sleep
}