const { Client } = require('ssh2');
var events = require('events');
const { exit } = require('process');
const fs = require('fs');

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

const sshPath = '/home/matheus/.ssh/id_rsa';
// const sshPath = '/home/matheus-lucas/.ssh/id_rsa';
// const sshPath = "C:\\Users\\mathe\\.ssh\\id_rsa";

function experiment(client, eventEmitter) {
    const cmd = '/home/wasm/.nvm/versions/node/v17.9.1/bin/node ~/WebAssembly_2023/puppeteer/index.js';

    client.exec(cmd, (err, stream) => {
        if (err) throw err;

        stream.on('data', (data) => {
            process.stdout.write(data.toString());
        })

        stream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });

        stream.on('error', (data) => {
            throw new Error(data.toString());
        });

        stream.on('close', () => {
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
                process.stdout.write(message);
            }

            if (message.trim() === "Server running on port 3000") {
                eventEmitter.emit("start client");
            }
        });

        stream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });

        stream.run = (command) => stream.write(command + '\n')

        eventEmitter.on("close connections", () => {
            stream.run('\x03');
            server.end()
        });

        eventEmitter.on("start server", () => {
            process.stdout.write("Iniciando servidor\n");
            stream.run('/home/wasm/.nvm/versions/node/v21.0.0/bin/node Documents/WebAssembly_2023/offloading/slamServer/index.js');
        });

        eventEmitter.on("close server", () => {
            stream.run('\x03');
            eventEmitter.emit("experiment finished");
        });

        eventEmitter.emit("start server");
    });
}

function test(numberOfExperiments, networkEvents) {
    if (numberOfExperiments < 1) {
        throw new Error("Number of experiments invalid");
    }

    const serverConfig = {
        host: '10.16.1.3',
        username: 'wasm',
        privateKey: fs.readFileSync(sshPath)
    };

    const clientConfig = {
        host: '10.16.1.1',
        username: 'wasm',
        privateKey: fs.readFileSync(sshPath)
    };

    const server = new Client();
    const client = new Client();

    const experimentEvents = new events.EventEmitter();

    let experimentIndex = 0;

    server.on('ready', () => {
        startServer(server, experimentEvents);
        experimentIndex++;
    }).connect(serverConfig);

    client.on('ready', () => {
        experimentEvents.on("start client", () => {
            process.stdout.write(`Iniciando experimento número ${experimentIndex}\n`);
            experiment(client, experimentEvents)});
        experimentEvents.on("close connections", () => {
            client.end();
            networkEvents.emit("new network");
        });
    }).connect(clientConfig);

    experimentEvents.on("experiment finished", () => {
        experimentIndex++;

        if (experimentIndex > numberOfExperiments) {
            experimentEvents.emit("close connections");
            return;
        }

        experimentEvents.emit("start server");
    })
}

function configNetwork(config, value, networkEvents, lastConfig, lastValue) {
    const clientConfig = {
        host: '10.16.1.1',
        username: 'wasm',
        privateKey: fs.readFileSync(sshPath)
    };

    const client = new Client();

    const controller = new events.EventEmitter();

    client.on('ready', () => {
        client.shell(async (err, stream) => {
            if (err) throw err;

            stream.run = (command) => stream.write(command + '\n');

            controller.on("logged", () => {
                stream.run(`mv Downloads/* planilhas/${lastConfig}/${lastValue}`);
                stream.run(`tcdel eno1 --all`);
                stream.run(`tcset eno1 --${config} ${value}`);
                stream.run("tcshow eno1");
                stream.run("exit");
            })

            stream.on('data', async (data) => {
                const message = data.toString();

                if (message.trim() === "[sudo] senha para wasm:") {
                    stream.run("aula123");
                    await sleep(500);
                    controller.emit("logged");
                }

                if (!message.includes("@wasm-OptiPlex-7010")) {
                    process.stdout.write(message);
                }

                if (message.trim() === "exit") {
                    process.stdout.write(`Rede configurada ${config} ${value}\n`)
                    networkEvents.emit("network configured");
                    client.end();
                }
            });

            stream.stderr.on('data', (data) => {
                throw new Error(data.toString());
            });

            stream.run("sudo su");
        });
    }).connect(clientConfig);
}

(async () => {
    const networkEvents = new events.EventEmitter();
    const numberOfExperiments = 1;

    const networkConfig = [
        {
            name: "rate",
            values: [
                "25Mbps",
                "50Mbps",
                "100Mbps",
                "200Mbps",
                "400Mbps",
                "800Mbps",
            ]
        },
        {
            name: "delay",
            values: [
                "2.5ms",
                "5ms",
                "10ms",
                "20ms",
                "40ms",
                "80ms",
            ]
        },
        {
            name: "loss",
            values: [
                "1%",
                "2%",
                "3%",
                "4%",
                "5%",
                "6%",
            ]
        }
    ]

    networkEvents.on("network configured", () => test(numberOfExperiments, networkEvents));

    let networkIndex = 0;
    let networkValueIndex = 0;
    let lastName = "";
    let lastValue = "";

    networkEvents.on("new network", () => {
        networkValueIndex++;

        if (!networkConfig[networkIndex]) {
            exit(0);
        }

        if (networkValueIndex >= networkConfig[networkIndex].values.length) {
            networkValueIndex = 0;
            networkIndex++;
        }

        if (networkIndex === networkConfig.length) {
            configNetwork("rate", "1Gbps", networkEvents, lastName, lastValue);
            return;
        }

        const { name, values } = networkConfig[networkIndex];
        const value = values[networkValueIndex];
        configNetwork(name, value, networkEvents, lastName, lastValue);
        lastName = name;
        lastValue = value;
    });

    const initialNetwork = networkConfig[networkIndex];
    configNetwork(initialNetwork.name, initialNetwork.values[networkValueIndex], networkEvents, lastName, lastValue);
    lastName = initialNetwork.name;
    lastValue = initialNetwork.values[networkIndex];
})()
