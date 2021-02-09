const express = require('express')
const app = express()
const os = require('os')

const { toRomanNumeral } = require('./toRomanNumeral')

app.get('/roman-numeral/:number', (req, res) => {
    let results = {}
    results[`${req.params.number}`] = toRomanNumeral(req.params.number)
    res.status(200).json(results)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Roman-Numeral services listening at http://localhost:${port}`)
})