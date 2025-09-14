const Persons = (props) => {
    const { persons } = props
    console.log(persons)
    
    return (
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
    )
}

export default Persons