import { useState } from 'react'


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

  const handleNewPersons = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  console.log(filteredNames)
  

  return (
    <div>
      <h2>Phonebook</h2>

      <div>filter shown with <input value={newSearch} onChange={(event) => setNewSearch(event.target.value)} /></div>

      <h2>add a new</h2>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewPersons} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
      
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {newSearch ? 
          filteredNames.map(person => (
            <li key={person.name}>{person.name}</li>
          ))
          :
        
        persons.map(person => (
          <li key={person.name}>{person.name} {person.phoneNumber}</li>
        ))
        }
      </ul>
    </div>
  )
}

export default App