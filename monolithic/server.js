const express = require('express')
const app = express()
const os = require('os')
const { toRomanNumeral } = require('./toRomanNumeral')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('convert')
})

app.get('/convert', (req, res) => {
    let results = {}
    results['number'] = req.query.number
    results['romanNumerals'] = toRomanNumeral(results.number)
    //console.log(os.hostname())
    res.status(200).render('results', { results: results, hostname: os.hostname() })
})

app.get('/roman-numeral/:number', (req, res) => {
    let results = {}
    results[`${req.params.number}`] = toRomanNumeral(req.params.number)
    res.status(200).json(results)
})

const port = process.env.PORT || 8099
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})