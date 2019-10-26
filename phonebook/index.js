const express     = require('express')
const app         = express()
const body_parser = require('body-parser')
const phonebook   = [
      {
        "name": "szaasdd",
        "number": "efefdsf",
        "id": 5
      },
      {
        "name": "sadas",
        "number": "qqwqwe",
        "id": 7
      },
      {
        "name": "asd",
        "number": "ffff",
        "id": 8
      },
      {
        "name": "yes",
        "number": "1293945",
        "id": 9
      },
      {
        "name": "dfghhjj",
        "number": "g23423",
        "id": 10
      },
      {
        "name": "funking",
        "number": "funking",
        "id": 11
      },
      {
        "name": "penny",
        "number": "penny",
        "id": 12
      },
      {
        "name": "asdasd",
        "number": "wwww",
        "id": 13
      }
]
app.use(body_parser.json())

app.get('/api/persons', (req, res) => {
    if (!phonebook.length) {
        return res.status(404).json();
    }
    res.json(phonebook)
})

app.get('/info', (req, res) => {
    res.send(`<div><p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p></div>`)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})