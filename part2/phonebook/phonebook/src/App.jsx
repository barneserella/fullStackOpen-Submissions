import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
 
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