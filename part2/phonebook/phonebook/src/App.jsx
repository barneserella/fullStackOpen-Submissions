import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(person => {
        console.log('promise fulfilled')
        setPersons(person)
      })
  }, [])
  console.log('render', persons.length, 'persons')
 
  const addName = (event) => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    console.log(nameExists)

    if(nameExists){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const updatedPerson = { ...nameExists, phoneNumber: newNumber }

        personsService
          .update(nameExists.id, updatedPerson)
          .then((res) => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : res
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            console.error('Error updating person: ', err)
          })
      }
    }else {

      const personObject = {
      name: newName,
      phoneNumber: newNumber
    }

    personsService
          .create(personObject)
          .then(person => {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
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
      phoneNumber: event.target.phoneNumber
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
 

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />

      <h2>add a new</h2>

      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      
      <Persons  newSearch={newSearch} persons={persons} deletePersons={deletePersons} />

    </div>
  )
}

export default App