require('dotenv').config()
const express     = require('express')
const body_parser = require('body-parser')
const morgan      = require('morgan')
const cors        = require('cors')
const Phone       = require('./models/phonebook')
const app         = express()
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
  Phone.find({}).then(people => {
    res.json(people.map(p => p.toJSON()));
  })
})

app.get('/api/persons/:id', (req, res) => {
  Phone.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(error => {
      res.status(404).json()
    })
})

app.get('/info', (req, res) => {
  Phone.countDocuments({}, (error, count) => {
    res.send(`<div><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></div>`)
  }).catch(error => console.log("/info ", error))
})

app.delete('/api/persons/:id', (req, res) => {
  // const id = Number(req.params.id);
  // const person = phonebook.find(person => person.id === id)
  // if (person === undefined) {
  //   return res.status(404).end()
  // }

  // phonebook = phonebook.filter(person => person.id === id)

  Phone.findByIdAndDelete(req.params.id)
    .then(count => {
      if (count)
        return res.status(204).end();
      return res.status(404).end();
    })
    .catch(error => console.log(error))
  
  
})

app.post('/api/persons', (req, res) => {
  const _name = req.body.name;
  const _number = req.body.number;
  if (!_number || !_name ) {
    return res.status(400).json({error: "content missing"});
  }

  Phone.find({ name: _name })
    .then((people) => {
      if (people.length)
        return res.status(400).json({error: "number already exists" });

      const newPerson = new Phone({
        name: _name, number: _number
      })

      newPerson.save().then(response => {
        res.json(response.toJSON());
      }).catch((error) => {
        console.err("get /api/persons", error.message)
      })

    })
    .catch((error) => {
      console.log("error:", error.message)
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})