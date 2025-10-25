import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
          setMessage('initial notes')
          setTimeout(() => {
            setMessage(null)},
            5000
          )
        })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setMessage('note created')
        setNewNote('')
        setTimeout(() => {
          setMessage(null)},
          5000
        )
      })
      .catch(err => {
            console.error('Error adding note:', err)
            setErrorMessage('Error adding new note')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    console.log(note)
    const changedNote = { ...note, important: !note.important }

    noteService 
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        console.error(error)
      setErrorMessage(
        `Note '${note.content}' was already deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>

      {message ? 
      <Notification message={message} /> :
      <Notification message={errorMessage} />}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App