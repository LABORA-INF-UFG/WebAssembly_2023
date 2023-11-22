const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { Client } = require('ssh2');
var events = require('events');

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

// const sshPath = '/home/matheus/.ssh/id_rsa';
const sshPath = "C:\\Users\\mathe\\.ssh\\id_rsa";

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

            if (!message.includes("@wasm-ater06")) {
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

function test(numberOfExperiments, eventEmitter) {
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

    let experimentIndex = 0;

    server.on('ready', () => {
        startServer(server, eventEmitter);
        experimentIndex++;
        console.log(`Experiment number ${experimentIndex}`);
        eventEmitter.emit('start server')
    }).connect(serverConfig);

    client.on('ready', () => {
        console.log("Cliente conectado e pronto");
        eventEmitter.on("start client", () => experiment(client, eventEmitter));
        eventEmitter.on("close connections", () => client.end());
    }).connect(clientConfig);

    eventEmitter.on("experiment finished", () => {
        experimentIndex++;

        if (experimentIndex > numberOfExperiments) {
            eventEmitter.emit("close connections");
            return;
        }

        console.log(`Experiment number ${experimentIndex}`);
        eventEmitter.emit("start server");
    })
}

function configNetwork(config, value, eventEmitter) {
    const clientConfig = {
        host: '10.16.1.1',
        username: 'wasm',
        privateKey: require('fs').readFileSync(sshPath)
    };

    const client = new Client();

    client.on('ready', () => {
        client.shell(async (err, stream) => {
            if (err) throw err;

            stream.on('data', (data) => {
                const message = data.toString();

                if (!message.includes("@wasm-OptiPlex-7010")) {
                    process.stdout.write(data.toString());
                }
            });

            stream.on('close', () => {
                console.log("Configuração de rede encerrada")
                eventEmitter.emit("network configured");
            });

            stream.stderr.on('data', (data) => {
                throw new Error(data.toString());
            });

            stream.run = (command) => stream.write(command + '\n')

            stream.run("sudo su");
            await sleep(500);
            stream.run("aula123");
            await sleep(500);
            stream.run("tcdel eno1 --all");
            stream.run(`tcset eno1 --${config} ${value}`);
            client.end();
        });
    }).connect(clientConfig);
}

(async () => {
    const eventEmitter = new events.EventEmitter();
    const numberOfExperiments = 3;

    const networkConfig = [
        {
            name: "rate",
            values: [
                "750Mbps",
                "500Mbps",
                "100Mbps",
            ]
        }
    ]

    eventEmitter.on("network configured", () => test(numberOfExperiments, eventEmitter));

    let networkIndex = 0;
    let networkValueIndex = 0;

    eventEmitter.on("close connections", () => {
        networkValueIndex++;

        if (networkValueIndex >= networkConfig[networkIndex].values.length) {
            networkValueIndex = 0;
            networkIndex++;
        }

        if (networkIndex < networkConfig.length) {
            const { name, values } = networkConfig[networkIndex];
            const value = values[networkValueIndex];
            const experimentalEvents = new events.EventEmitter();
            configNetwork(name, value, experimentalEvents);
        }
    });

    const initialNetwork = networkConfig[networkIndex];
    configNetwork(initialNetwork.name, initialNetwork.values[networkValueIndex], eventEmitter);
})()
