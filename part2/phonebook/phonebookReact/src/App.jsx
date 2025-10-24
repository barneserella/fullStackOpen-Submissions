import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
 
  const addName = (event) => {
    // event.preventDefault()

    const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    console.log('nameExistsReact: ', nameExists)

    if(nameExists){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const updatedPerson = { ...nameExists, number: newNumber }

        personsService
          .update(nameExists.id, updatedPerson)
          .then((res) => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : res
            ))
            setMessage(`${newName} has been updated.`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(err => {
            console.error(`Error updating ${newName}:`, err)
            setErrorMessage(`Error updating ${newName}, person already deleted from server.`)
            // setPersons(persons.filter(person => person.id !== nameExists.id))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }else {

      const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
          .create(personObject)
          .then(person => {
            setPersons(persons.concat(person))
            setMessage(`${newName} has been created.`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(err => {
            console.error('Error adding person :', err)
          })
    
    
    
  }
}

  const deletePersons = (event) => {
    

    const id = event.target.id

    const personObject = {
      name: event.target.name,
      number: event.target.number
    }

    if(window.confirm(`Delete entry?`)){

    personsService
      .remove(id, personObject)
      .then(() => {
        
          setPersons(persons.filter(person => id !== person.id))
        
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
    }
      
  }

  const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
 
  const notificationErrorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

  return (
    <div>
      <h2>Phonebook</h2>

      {message ? 
      <Notification style={notificationStyle} message={message} /> :
      <Notification style={notificationErrorStyle} message={errorMessage} />}

      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />

      <h2>add a new</h2>

      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      
      <Persons  newSearch={newSearch} persons={persons} deletePersons={deletePersons} />

    </div>
  )
}

export default App