const express = require('express');
require('dotenv').config(); // Load .env variables

const misFunctions = require("./scripts/misFunctions");

const app = express();

// Use environment variables
const port = process.env.PORT || 3000;

// Set the public folder for static files
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory for EJS templates
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

// API calls
app.get('/api/checkDomain', (req, res) => {
    let domain = process.env.domain;
    console.log(domain);
    res.json({domain: domain});
})

app.get('/api/getPtData/:tei', async (req, res) => {
    let tei = req.params.tei;
    console.log(tei);
    let ptData = await misFunctions.getTeiData(tei);
    console.log(ptData);
    res.json(ptData);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
