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
            await task();
        } catch (error) {
            console.error('Error processing task:', error);
        }
    }

    isProcessing = false;
}

module.exports = { addToQueue };
