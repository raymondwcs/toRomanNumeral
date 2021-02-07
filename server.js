const express = require('express')
const app = express()
const os = require('os')

app.set('view engine', 'ejs')

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
    //console.log(os.hostname())
    res.status(200).render('results', { results: results, hostname: os.hostname() })
})

app.get('/roman-numeral/:number', (req, res) => {
    let results = {}
    results[`${req.params.number}`] = toRomanNumeral(req.params.number)
    res.status(200).json(results)
})

const port = process.env.PORT || 8099
app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})