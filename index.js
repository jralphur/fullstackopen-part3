const express     = require('express')
const app         = express()
const body_parser = require('body-parser')
const morgan      = require('morgan')
const cors        = require('cors')

let phonebook   = [
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

app.use(cors())
app.use(express.static('build'))
morgan.token('json', (req, res) => {
  return JSON.stringify(req.body);
})

app.use(body_parser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.get('/api/persons', (req, res) => {
    if (!phonebook.length) {
        return res.status(404).end();
    }
    res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find(person => person.id === id)

  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
})

app.get('/info', (req, res) => {
    res.send(`<div><p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p></div>`)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find(person => person.id === id)

  if (person === undefined) {
    console.log("app.delete()")
    return res.status(404).end()
  }

  phonebook = phonebook.filter(person => person.id === id)
  res.status(204).json(person).end();
})

app.post('/api/persons', (req, res) => {
  const { number, name } = req.body
  if (!number || !name ) {
    return res.status(400).json({error: "content missing"});
  }

  if (phonebook.find(person => person.name == name)) {
    return res.status(400).json({error: "number already exists"})
  }

  const newPerson = {
    name, number, id: Math.floor(Math.random() * (Math.pow(2, 32) - 1))
  }

  phonebook = phonebook.concat(newPerson)
  res.json(newPerson)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})