const { Worker } = require('worker_threads');

const queue = []
let isProcessing = false;

function addToQueue(task) {
    queue.push(task);
    processQueue();
}

async function processQueue() {
    if (isProcessing) return;
    isProcessing = true;

    while (queue.length > 0) {
        const task = queue.shift();
        try {
            await runTaskInWorker(task);
        } catch (error) {
            console.error('Error processing task:', error);
        }
    }

    isProcessing = false;
}

function runTaskInWorker(task) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./emailService.js', {
            workerData: { task }
        });

        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', (err) => {
            reject(err);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

module.exports = { addToQueue };
