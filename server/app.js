const express = require('express')
const app = express()
const path = require('path');

app.use(express.static('dist'))

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, './dist/index.html'), (error) => {
    if (error) {
      response.status(500).send(error)
    }
  })
})

module.exports = app