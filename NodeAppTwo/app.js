const express = require('express');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const app = express();
const port = 8000;

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// WebAssembly route for numerical computations
app.get('/compute', async (req, res) => {
    try {
        const wasmBuffer = fs.readFileSync(path.resolve(__dirname, 'wasm/vortex_simulation.wasm'));
        const wasmModule = await WebAssembly.compile(wasmBuffer);
        const wasmInstance = await WebAssembly.instantiate(wasmModule, {});

        // Assuming the exported function from C++ is `simulateVortex`
        const { simulateVortex } = wasmInstance.exports;

        // Run the WebAssembly function (mock example)
        const result = simulateVortex(3); // Pass necessary arguments as needed

        // Generate data for D3.js visualization
        const data = new Float32Array(wasmInstance.exports.memory.buffer, result, 6); // Example data extraction
        const jsonData = Array.from(data);

        res.json({ data: jsonData });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
