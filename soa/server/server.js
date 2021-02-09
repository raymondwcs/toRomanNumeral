const express = require('express')
const app = express()
const os = require('os')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const redis = require("redis");

const ROMANNUMERALURL = `http://roman-numeral:${process.env.ROMANNUMERALPORT}/roman-numeral`
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('convert')
})

app.get('/convert', (req, res) => {
    const number2convert = req.query.number

    const client = redis.createClient({ host: 'redis' });
    client.on("error", function (error) {
        console.error(error);
        return res.status(500).json(error);
    });

    client.hgetall(req.query.number, function (err, value) {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        if (value) {
            console.log(`Found (${number2convert}) in cache: ${JSON.stringify(value)}`)
            let results = {}
            results['number'] = number2convert
            results['romanNumerals'] = value.romanNumerals
            res.status(200).render('results', { results: results, hostname: os.hostname() })
        } else {
            console.log(`Making request: ${ROMANNUMERALURL}...`)
            fetch(`${ROMANNUMERALURL}/${number2convert}`, {
                method: "GET"
            })
                .then(response => {
                    console.log(`response: ${response.status}, ${response.ok}`)
                    switch (response.status) {
                        case 403:
                            return res.redirect('/')
                            break;
                        case 200:
                            return (response.json()) // goto next .then()
                            break;
                        default:
                            return res.status(500).end(`GET ${ROMANNUMERALURL} Error ${response.status}`)
                    }
                })
                .then((json) => {
                    let results = {}
                    let answers = json[req.query.number]
                    results['number'] = number2convert
                    results['romanNumerals'] = answers
                    res.status(200).render('results', { results: results, hostname: os.hostname() })
                    console.log(`Returned results: ${JSON.stringify(results)}`)
                    // writing to cache...
                    client.hset(number2convert, "romanNumerals", answers)
                    console.log(`Written ${JSON.stringify(results)}to cache`)
                    //
                })
        }
    })
})

const port = process.env.PORT || 8099
app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
})