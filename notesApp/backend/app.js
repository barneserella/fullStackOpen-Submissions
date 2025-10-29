const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const Note = require('./models/note')

const app = express();

logger.info('connecting to ',config.MONGODB_URI)
// const requestLogger = (req, res, next) => {
//   console.log('Method:', req.method)
//   console.log('Path:  ', req.path)
//   console.log('Body:  ', req.body)
//   console.log('---')
//   next()
// }
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(middleware.errorHandler)

module.exports = app