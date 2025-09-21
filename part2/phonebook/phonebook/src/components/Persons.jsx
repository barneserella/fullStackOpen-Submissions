

const Persons = ({ newSearch, persons}) => {
    
   
    console.log('newSearch: ', newSearch, 'Persons: ',persons)

    const filteredNames = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  console.log(filteredNames)

    return (
        <ul>
        {newSearch ? 
          filteredNames.map(person => (
            <li key={person.name}>{person.name} {person.phoneNumber}</li>
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