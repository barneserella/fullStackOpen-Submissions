const PersonForm = ({addName, newName, setNewName, newNumber, setNewNumber}) => {
    

    const handleNewPersons = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewPersons} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
      
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm