

const Persons = ({ newSearch, persons, deletePersons}) => {
    
    const filteredNames = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    console.log(filteredNames)

    return (
        <ul>
        {newSearch ? 
          filteredNames.map(person => (
            <li key={person.name}>{person.name} {person.phoneNumber} <button id={person.id} onClick={deletePersons}>delete person</button></li>
          ))
          :
        
        persons.map(person => (
          <li key={person.name}>{person.name} {person.phoneNumber} <button id={person.id} onClick={deletePersons} >delete person</button></li>
        ))
        }
        </ul>
    )
}

export default Persons