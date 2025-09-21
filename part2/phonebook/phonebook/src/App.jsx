import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log('promise fulfilled')
        setPersons(res.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
 
  const addName = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    console.log(nameExists)
    if(nameExists){
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const personObject = {
      name: newName,
      phoneNumber: newNumber
    }

    setPersons(persons.concat(personObject))
    
    setNewName('')
    setNewNumber('')
  }

 

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />

      <h2>add a new</h2>

      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      
      <Persons  newSearch={newSearch} persons={persons}  />

    </div>
  )
}

export default App