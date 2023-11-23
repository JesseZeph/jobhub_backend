const express = require('express')
const app = express()
const port = 5002
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/jobs')
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to DB'))
.catch(() => console.log('Error connecting to DB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/api/jobs', jobRouter)

app.get('/', (req, res) => res.send('Testing World!'))
app.listen(process.env.PORT || port, () => console.log(`Jobhunt listening on port ${process.env.PORT}!`))