// index.js is a express server
const connectToMongo = require('./db');
var cors = require('cors')

const express = require('express');
const { db } = require('./models/User');

connectToMongo();
// Changing port from 3000 to 5000 bcz on port 3000 react app will work
const port = 5000

var app = express()

app.use(cors())


app.use(express.json())

// Available Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})