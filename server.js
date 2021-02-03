const express = require('express')
const app = express()

app.set('view engine', 'ejs')

var apiCallCount = 0
var serverAddress = ''

const toRomanNumeral = (int) => {
    const romanNumerals = [
        { number: 1000, letter: 'M' },
        { number: 900, letter: 'CM' },
        { number: 500, letter: 'D' },
        { number: 400, letter: 'CD' },
        { number: 100, letter: 'C' },
        { number: 90, letter: 'XC' },
        { number: 50, letter: 'L' },
        { number: 40, letter: 'XL' },
        { number: 10, letter: 'X' },
        { number: 9, letter: 'IX' },
        { number: 5, letter: 'V' },
        { number: 4, letter: 'IV' },
        { number: 1, letter: 'I' }
    ];

    let convertedNumber = ""

    for (const i in romanNumerals) {
        while (int >= romanNumerals[i].number) {
            convertedNumber += romanNumerals[i].letter
            int -= romanNumerals[i].number
        }
    }

    return convertedNumber;
};

app.get('/', (req, res) => {
    res.status(200).render('convert')
})

app.get('/convert', (req, res) => {
    let results = {}
    results['number'] = req.query.number
    results['romanNumerals'] = toRomanNumeral(results.number)
    res.status(200).render('results', { results: results })
})

app.get('/roman-numeral/:number', (req, res) => {
    let results = {}
    results['number'] = req.params.number
    results['romanNumerals'] = toRomanNumeral(results.number)
    results['logs'] = {}
    results.logs['apiCallCount'] = ++apiCallCount
    results.logs['serverAddress'] = serverAddress
    res.status(200).json(results)
})

const port = process.env.PORT || 8099
const appInstance = app.listen(port, function () {
    var serverAddress = appInstance.address().address
    console.log(`Server listening at: ${JSON.stringify(appInstance.address())}`)
})

// app.listen(process.env.PORT || port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })