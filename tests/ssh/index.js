const SSH2Promise = require('ssh2-promise');

const sshPath = "/home/matheus/.ssh/id_rsa";

const sshConfig = {
    server: {
        host: '10.16.1.3',
        username: 'wasm',
        identity: sshPath
    },
    client: {
        host: '10.16.1.1',
        username: 'wasm',
        identity: sshPath
    },
    host: {
        host: '200.137.197.212',
        username: 'matheus',
        identity: 'C:\\Users\\mathe\\.ssh\\id_rsa'
    }
};

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

async function main() {
    const server = new SSH2Promise(sshConfig.server);
    const client = new SSH2Promise(sshConfig.client);

    const connections = [
        server.connect(),
        client.connect()
    ]

    await Promise.all(connections);

    const a = await client.exec("pwd");
    const b = await server.exec("/home/wasm/.nvm/versions/node/v21.0.0/bin/node");
    console.log(a);

    b.on('data', (data) => {
      console.log(data);
    })

    client.close();

    sleep(5000);
    server.close();
}

(async () => {

    try {
        await main();
    } catch (error) {
        throw new Error(error);
    }

})();