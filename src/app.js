// Load .env file into process.env
require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Messages = require('./consts.js')
const utils = require('./utils.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use(require('./routes/nft'))
app.use(require('./routes/proxy'))

/**
 * @dev Index, used to ping server
 */
app.get('/', (req, res) => {
  res.status(200).send(Messages.SUCCESS)
})

/**
 * @dev Get the current nonce from the smart contract, which must be signed in order
 *      to access POST endpoints
 *      TODO this needs to correctly account for the actual data returned by the contract
 */
app.get('/getNonce', (req, res) => {
  let nonce = utils.getNonce(app)
  if (typeof nonce === "string") {
    res.json({ 'toBeSigned': nonce })
  } else {
    res.json({ 'nonce': nonce, 'typeof': typeof nonce })
  }
})

module.exports = app
