const { Worker, isMainThread } = require('worker_threads')

function main() {
    const LEADING_ZEROES = 4

    for (let i = 0; i < 10; i++) {
        const worker = new Worker(__dirname + '/worker.js', {
            workerData: {
                i: i + 1,
            }
        });

        worker.on('error', console.error)

        worker.once('message', (message) => {
            console.log(message);
        });

        worker.postMessage("Oi de outra thread")
    }

}

main();