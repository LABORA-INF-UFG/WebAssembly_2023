const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { Client } = require('ssh2');
var events = require('events');

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

const sshPath = '/home/matheus/.ssh/id_rsa';

function experiment(client, eventEmitter) {
    client.exec('.nvm/versions/node/v17.9.1/bin/node ~/WebAssembly_2023/tests/puppeteer/index.js', (err, stream) => {
        if (err) throw err;

        stream.on('data', (data) => {
            process.stdout.write(data.toString());
        })

        stream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });

        stream.on('close', (code, signal) => {
            eventEmitter.emit("close server");
        })
    });
}

function startServer(server, eventEmitter) {
    server.shell((err, stream) => {
        if (err) throw err;

        stream.on('data', (data) => {
            const message = data.toString();

            if (!message.includes("wasm@wasm-ater06")) {
                process.stdout.write(data.toString());
            }

            if (message.trim() === "Server running on port 3000") {
                eventEmitter.emit("start client")
            }
        });

        stream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });
        stream.run = (command) => stream.write(command + '\n')

        stream.run('cd Documents/WebAssembly_2023/offloading/server');
        stream.run('node index.js');

        eventEmitter.on("close connections", () => {
            stream.run('\x03');
            server.end()
        });

        eventEmitter.on("start server", () => {
            stream.run('node index.js');
        });

        eventEmitter.on("close server", () => {
            stream.run('\x03');
            eventEmitter.emit("experiment finished")
        });

    });
}

function test(numberOfExperiments) {
    if (numberOfExperiments < 1) {
        throw new Error("Number of experiments invalid");
    }

    const serverConfig = {
        host: '10.16.1.3',
        username: 'wasm',
        privateKey: require('fs').readFileSync(sshPath)
    };

    const clientConfig = {
        host: '10.16.1.1',
        username: 'wasm',
        privateKey: require('fs').readFileSync(sshPath)
    };

    const server = new Client();
    const client = new Client();

    const eventEmitter = new events.EventEmitter();

    let experimentIndex = 0;

    server.on('ready', () => {
        startServer(server, eventEmitter);
        experimentIndex++;
        console.log(`Experiment number ${experimentIndex}`);
        eventEmitter.emit('start server')
    }).connect(serverConfig);

    client.on('ready', () => {
        eventEmitter.on("start client", () => experiment(client, eventEmitter));
        eventEmitter.on("close connections", () => client.end());
    }).connect(clientConfig);

    eventEmitter.on("experiment finished", () => {
        if (experimentIndex < numberOfExperiments) {
            experimentIndex++;
            console.log(`Experiment number ${experimentIndex}`);
            eventEmitter.emit("start server");
        } else {
            eventEmitter.emit("close connections")
        }
    })
}

async function configNetwork() {
    const clientConfig = {
        host: '10.16.1.1',
        username: 'wasm',
        privateKey: require('fs').readFileSync(sshPath)
    };

    const client = new Client();

    client.on('ready', () => {
        client.shell((err, stream) => {
            if (err) throw err;

            stream.on('data', (data) => {
                const message = data.toString();

                if (!message.includes("wasm@wasm-ater06")) {
                    process.stdout.write(data.toString());
                }
            });

            stream.stderr.on('data', (data) => {
                throw new Error(data.toString());
            });

            stream.run = (command) => stream.write(command + '\n')

            stream.run("sudo tcdel eth0 --all")



        });
    }).connect(clientConfig);
}

(async () => {
    await configNetwork();
    // test(3);
})()
