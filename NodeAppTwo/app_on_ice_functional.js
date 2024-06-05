const express = require('express');
const os = require('os');
const axios = require('axios');
const { createCanvas } = require('canvas');

const app = express();
const port = 8000;

// System information route
app.get('/NodeAppTwo', async (req, res) => {
    try {
        const message = '<h1>Node.js Express Test Application</h1>';
        const versionInfo = `<p>Node.js Version: ${process.version}</p>`;
        const osInfo = `<p>Operating System: ${os.platform()}</p>`;
        const hostnameInfo = `<p>Hostname: ${os.hostname()}</p>`;
        let response = `${message}${versionInfo}${osInfo}${hostnameInfo}`;

        // String manipulation examples
        response += `<p>Reversed String: ${reverseString('hello world')}</p>`;
        response += `<p>Uppercase String: ${'hello world'.toUpperCase()}</p>`;

        // Data structure examples
        response += `<p>List Sum: ${sumList([1, 2, 3, 4, 5])}</p>`;
        response += `<p>Dictionary Keys: ${Object.keys({ a: 1, b: 2, c: 3 }).join(', ')}</p>`;

        // Current datetime
        response += `<p>Current Time: ${new Date()}</p>`;

        // Data Science Workflow
        // Step 1: Data Collection
        const irisData = await axios.get('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv');
        const irisCsv = irisData.data;

        // Step 2: Exploratory Data Analysis (EDA) Visualization
        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        // Step 3: Feature Engineering (including feature scaling)
        const scaledData = minMaxScaling([1, 2, 3, 4, 5]); // Example data for feature scaling
        response += `<p>Scaled Data: ${scaledData}</p>`;

        // Step 4: Predictive Modeling
        // Not necessary for this example

        // Sending the response
        res.send(response);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Helper functions
function reverseString(str) {
    return str.split('').reverse().join('');
}

function sumList(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}

// Min-max scaling function
function minMaxScaling(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map(value => (value - min) / (max - min));
}
