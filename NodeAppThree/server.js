const http = require('http');
const express = require('express');

const app = express();

function findFreePort(startPort, endPort, callback) {
    console.log(`Searching for a free port between ${startPort} and ${endPort}...`);
    let foundPort = false;
    for (let port = startPort; port <= endPort; port++) {
        if (foundPort) break; // Exit loop if a free port is already found
        console.log(`Checking port ${port}...`);
        const server = http.createServer(app);
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is in use`);
                server.close();
            } else {
                console.error(`Error occurred while checking port ${port}:`, err);
            }
            if (port === endPort) {
                callback(new Error('No free port available'));
            }
        });
        server.once('listening', () => {
            server.close(() => {
                foundPort = true; // Mark the port as found
                console.log(`Found free port: ${port}`);
                callback(null, port);
            });
        });
        server.listen(port);
    }
}

// Example usage:
findFreePort(3000, 5000, (err, port) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Server can listen on port:', port);
        // Start your server on the free port here
        // app.listen(port, () => {
        //     console.log(`Server is running on port ${port}`);
        // });
    }
});

