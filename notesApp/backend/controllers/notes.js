const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
   const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  }else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body

  const note = await Note.findById(request.params.id)
    if (!note) {
      return response.status(404).end()
    }

    note.content = content
    note.important = important

    const updatedNote = await note.save()
    response.json(updatedNote)
    
  })

module.exports = notesRouter


// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (req, res) => {
//   Note.find({}).then(notes => {
//     res.json(notes)
//   })
// })

// app.get('/api/notes/:id', (req, res, next) => {
//   Note.findById(req.params.id).then(note => {
//     if (note) {
//         res.json(note)
//       } else {
//         res.status(404).end()
//       }
//   })
//   .catch(error => next(error))
// })

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

// app.post('/api/notes', (req, res, next) => {
//   const body = req.body

//   if(!body.content){
//     return res.status(400).json({
//         error: 'content missing'
//     })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   })
 
//   note.save().then(savedNote => {
//     res.json(savedNote)
//   })
//   .catch(error => next(error))
// })

// app.put('/api/notes/:id', (req, res, next) => {
//   const { content, important } = req.body

//   Note.findById(req.params.id)
//   .then(note => {
//     if(!note) {
//       return res.status(404).end()
//     }

//     note.content = content
//     note.important = important

//     return note.save().then((updatedNote) => {
//       res.json(updatedNote)
//     })
//   })
//   .catch(error => next(error))
// })

// app.delete('/api/notes/:id', (req, res, next) => {
//   Note.findByIdAndDelete(req.params.id)
//     .then(res => {
//       res.status(204).end()
//     })
//     .catch(error => next(error))
// })