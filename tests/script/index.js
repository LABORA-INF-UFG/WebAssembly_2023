const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { Client } = require('ssh2');
var events = require('events');
const { exit } = require('process');

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

const sshPath = '/home/matheus/.ssh/id_rsa';
// const sshPath = "C:\\Users\\mathe\\.ssh\\id_rsa";

function experiment(client, eventEmitter) {
    client.exec('.nvm/versions/node/v17.9.1/bin/node ~/WebAssembly_2023/tests/puppeteer/index.js', (err, stream) => {
        if (err) throw err;

        stream.on('data', (data) => {
            process.stdout.write(data.toString());
        })

        stream.stderr.on('data', (data) => {
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

function test(numberOfExperiments, networkEvents) {
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

    const experimentEvents = new events.EventEmitter();

    let experimentIndex = 0;

    server.on('ready', () => {
        startServer(server, experimentEvents);
        experimentIndex++;
        console.log(`Experiment number ${experimentIndex}`);
        experimentEvents.emit('start server')
    }).connect(serverConfig);

    client.on('ready', () => {
        experimentEvents.on("start client", () => experiment(client, experimentEvents));
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

        console.log(`Experiment number ${experimentIndex}`);
        experimentEvents.emit("start server");
    })
}

function configNetwork(config, value, networkEvents, lastConfig, lastValue) {
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
                    process.stdout.write(message);
                }

                if (message.trim() === "exit") {
                    process.stdout.write(`Rede configurada ${config} ${value}\n`)
                    networkEvents.emit("network configured");
                }
            });

            stream.stderr.on('data', (data) => {
                throw new Error(data.toString());
            });

            stream.run = (command) => stream.write(command + '\n')

            stream.run("sudo su");
            await sleep(1000);
            stream.run("aula123");
            await sleep(1000);
            stream.run(`mv Downloads/* planilhas/${lastConfig}/${lastValue}`);
            stream.run(`tcdel eno1 --all`);
            stream.run(`tcset eno1 --${config} ${value}`);
            stream.run("tcshow eno1");
            stream.run("exit");
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
        console.log(lastName, lastValue);
        configNetwork(name, value, networkEvents, lastName, lastValue);
        lastName = name;
        lastValue = value;
    });

    const initialNetwork = networkConfig[networkIndex];
    configNetwork(initialNetwork.name, initialNetwork.values[networkValueIndex], networkEvents, lastName, lastValue);
    lastName = initialNetwork.name;
    lastValue = initialNetwork.values[networkIndex];
})()
