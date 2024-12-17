const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Load environment variables
const baseURL = 'https://api.meaningcloud.com/topics-2.0';
const apiKey = process.env.API_KEY;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Root endpoint
app.get('/', (req, res) => {
    res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route to handle form submissions
app.post('/api', async function (req, res) {
    const userInput = req.body.url;
    console.log(`You entered: ${userInput}`);

    // Validate the URL
    if (!userInput || !/^https?:\/\/.+$/.test(userInput)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        // Dynamic import for node-fetch
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

        // Build the API request URL
        const apiURL = `${baseURL}?key=${apiKey}&url=${userInput}&lang=en`;

        // Fetch data from MeaningCloud API
        const response = await fetch(apiURL);
        const mcData = await response.json();

        console.log('API Response:', mcData);

        // Return the API response to the client
        res.json({ message: 'URL received', data: mcData });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
