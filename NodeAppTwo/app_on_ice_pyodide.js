const { PythonShell } = require('python-shell');
const express = require('express');
const { Pyodide } = require('pyodide');
const app = express();
const port = 8000;

// Initialize Pyodide
async function initializePyodide() {
    const pyodide = await Pyodide.load();
    console.log('Pyodide initialized successfully');
    return pyodide;
}

// Execute Python code using Pyodide
async function executePythonCode(pyodide) {
    const pythonCode = `
        def hello():
            return "Hello from Python!"
    `;

    try {
        const result = await pyodide.runPythonAsync(pythonCode);
        console.log('Result from Python:', result);
        return result;
    } catch (error) {
        console.error('Error executing Python code:', error);
        throw error;
    }
}

// Express route
app.get('/', async (req, res) => {
    try {
        // Initialize Pyodide
        const pyodide = await initializePyodide();

        // Execute Python code
        const result = await executePythonCode(pyodide);

        // Send response after all asynchronous operations are completed
        res.send(result);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
