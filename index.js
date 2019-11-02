require('dotenv').config()
const express            = require('express')
const body_parser        = require('body-parser')
const morgan             = require('morgan')
const cors               = require('cors')
const Phone              = require('./models/phonebook')

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformmed id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.get('/api/persons', (req, res, next) => {
  Phone.find({})
    .then(people => {
    res.json(people.map(p => p.toJSON()));
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Phone.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (req, res, next) => {
  Phone.countDocuments({}, (error, count) => {
    res.send(`<div><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></div>`)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
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
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const _name = req.body.name;
  const _number = req.body.number;
  if (!_number || !_name ) {
    return res.status(400).json({error: "content missing"});
  }

  const newPerson = new Phone({
    name: _name, number: _number
  })

  newPerson.save().then(response => {
    res.json(response.toJSON());
  }).catch((error) => {
    console.log("/api/persons error")
    next(error)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number)  {
    return res.status(400).end()
  }

  const person = {
    name: body.name,
    number: body.number
  }
  
  console.log('app.put')
  Phone.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(newPerson => res.json(newPerson.toJSON()))
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})