const { PythonShell } = require('python-shell');
const express = require('express');
const app = express();
const port = 8000; // Change port number to 8000

// Express route
app.get('/', (req, res) => {
    // Python code
    const pythonCode = `
        def hello():
            return "Hello from Python!"
    `;

    // Execute Python code using Pyodide
    PythonShell.runString(pythonCode, null, (err, result) => {
        if (err) {
            console.error('Error executing Python code:', err);
            res.status(500).send('An error occurred.');
        } else {
            console.log('Result from Python:', result);
            res.send(result[0]);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
