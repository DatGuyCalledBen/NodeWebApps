const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

// Serve static files from the 'NodeWebApps/NodeAppThree' directory
app.use('/NodeAppThree', express.static(path.join(__dirname)));

// Handle requests at the root URL '/'
app.get('/NodeAppThree', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
