const { Client } = require('ssh2');
var events = require('events');
const { exit } = require('process');
const fs = require('fs');

let experimentIndex = 0;

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

const sshPath = '/home/matheus/.ssh/id_rsa';
// const sshPath = '/home/matheus-lucas/.ssh/id_rsa';
// const sshPath = "C:\\Users\\mathe\\.ssh\\id_rsa";

function experiment(client, eventEmitter, cpuData,  powerData) {
    const puppeteer = '/home/wasm/.nvm/versions/node/v17.9.1/bin/node ~/WebAssembly_2023/puppeteer/index.js';
    
    //Power
    client.shell((err, stream) => {
        if (err) throw err
        stream.run = (command) => stream.write(command + '\n')

        stream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });

        stream.on('data', async (data) => {
            const message = data.toString()
            console.log(message)
            if (message.trim() === "[sudo] senha para wasm:") {
                try{
                    stream.run("aula123");
                    await sleep(500)
                }catch (err){
                    console.error('Error writing to stream:', err);
                }
            }else{
                if(!fs.existsSync('./power.txt')){
                    fs.writeFileSync('./power.txt', '')
                }
                fs.appendFileSync('./power.txt', message)
            }

        })

        eventEmitter.on('close power', async () => {
            stream.run('\x03');
            await sleep(500)

            const data = fs.readFileSync("power.txt", "utf8")
            // Split the file into lines and take off lines with [Time, ... ,Watts] information
            const lines = data
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => !line.startsWith("Time"));
            
            // Find the lines with the desired data
            const avgLine = lines.find((line) => line.includes("Average"));
            const stdDevLine = lines.find((line) => line.includes("StdDev"));
        
            // Extract the Watts data
            const avgWatts = Number(avgLine
                .split(/\s+/)
                .filter((item) => item !== "")
                .pop());
            const stdDevWatts = Number(stdDevLine
                .split(/\s+/)
                .filter((item) => item !== "")
                .pop());
            
            // The number of samples is the number of lines between the headers and the summary
            const startLine = lines.findIndex((line) => line.length === 0);
            const endLine = lines.findIndex((line) => line.startsWith("-"));

            const numSamples = endLine - startLine - 1;
            
            const watts_upper = avgWatts + 1.96*(stdDevWatts/Math.sqrt(numSamples))
            const watts_lower = avgWatts - 1.96*(stdDevWatts/Math.sqrt(numSamples))

            powerData.push([avgWatts, watts_upper, watts_lower])

            fs.unlinkSync('./power.txt')
        })

        stream.run('sudo /usr/bin/powerstat -R 1 10000');

    })
    // 
    //CPU 
    client.shell((err, stream) => {
        if (err) throw err
        stream.run = (command) => stream.write(command + '\n')

        let cpu_squared_sum = 0 
        let cpu_sum = 0
        let cpu_values = []
        let cpu_upper, cpu_lower, cpu_mean, cpu_s, n

        stream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });

        stream.on('data', (data) => {
            
            const cpu_num = parseInt(data.toString());
            if(cpu_num){
                cpu_sum += cpu_num
                cpu_values.push(cpu_num)
            }
            
        })

        eventEmitter.on('close cpu', async () => {
            //close CPU bash script
            stream.run('touch ~/WebAssembly_2023/sshScript/stop-signal-cpu');
            await sleep(500)

            n = cpu_values.length

            cpu_mean = cpu_sum/n
            for(let i=0; i<n; i++){
                const mean_diference = cpu_values[i] - cpu_mean       
                cpu_squared_sum += Math.pow(mean_diference, 2)
            }

            cpu_s = Math.sqrt(cpu_squared_sum/(n-1))

            cpu_upper = cpu_mean + ((1.96*cpu_s)/(Math.sqrt(n)))
            cpu_lower = cpu_mean - ((1.96*cpu_s)/(Math.sqrt(n)))

            cpuData.push([cpu_mean, cpu_upper, cpu_lower])
            console.log("cpu mean: " + cpu_mean)
            
        })
        
        stream.run('~/WebAssembly_2023/sshScript/getCPU.sh')
    })

    
    client.exec(puppeteer, (puppeteerErr, puppeterStream) => {
        if (puppeteerErr) throw puppeteerErr;

        puppeterStream.on('data', (data) => {
            process.stdout.write(data.toString());
        })

        puppeterStream.stderr.on('data', (data) => {
            throw new Error(data.toString());
        });
        
        puppeterStream.on('error', (data) => {
            throw new Error(data.toString());
        });

        puppeterStream.on('close', () => {
            eventEmitter.emit("close cpu")
            eventEmitter.emit("close power")
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

    let powerData = [
        ['PowerMean', 'PowerUpper', 'PowerLower']
    ]

    let cpuData = [
        ['CpuMean', 'CpuUpper', 'CpuLower']
    ]

    server.on('ready', () => {
        startServer(server, experimentEvents);
        experimentIndex++;
    }).connect(serverConfig);

    client.on('ready', () => {
        experimentEvents.on("start client", () => {
            process.stdout.write(`Iniciando experimento número ${experimentIndex}\n`);
            experiment(client, experimentEvents, cpuData, powerData)});
        experimentEvents.on("close connections", () => {
            client.end();
            networkEvents.emit("new network");
        });
    }).connect(clientConfig);

    experimentEvents.on("experiment finished", () => {
        experimentIndex++;


        if (experimentIndex > numberOfExperiments) {
            experimentEvents.emit("close connections");
            getCSV(powerData, experimentIndex)
            getCSV(cpuData, experimentIndex)
            experimentIndex++;
            return;
        }

        experimentEvents.emit("start server");
    })
}


function getCSV(data, experimentIndex) {
    let csv = data.map(row => row.join(',')).join('\n');
    fs.writeFileSync(`output${experimentIndex}.csv`, csv, (err) => {
        if (err) throw err;
    });
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
