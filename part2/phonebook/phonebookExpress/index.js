require('dotenv').config()
const express = require('express');
const app = express();
const Person = require('./models/person')

app.use(express.json());

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
      res.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/info', (req, res, next) => {
    Person.find({}).then(persons => {
      res.json(`Phonebook has info for ${persons.length} people.
                ${Date()}`)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
      res.json(person)
    }).catch(error => next(error))
})

// const generateId = () => {
//     return Math.floor(Math.random() * 100000) + 1
// }

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({
        error: 'name or number missing'
    })
  }
        const person = new Person({
                          name: body.name,
                          number: body.number,
                      })
 
        person.save().then(savedPerson =>{
        res.json(savedPerson)
        })
        .catch(error => next(error))
      
    })

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate( 
        req.params.id,  
        { name, number },
        { 
      new: true, 
      runValidators: true,  // Enable validators
      context: 'query'      
    }
    )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
  })
  .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)