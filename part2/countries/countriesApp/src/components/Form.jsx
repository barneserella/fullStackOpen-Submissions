const Form = ({ newSearch, setNewSearch,  filteredCountries, handleShowCountry }) => {

    // const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))

    return (
        <div>
            
            <div>find countries </div><input value={newSearch} onChange={(event) => setNewSearch(event.target.value)} />
            
            {filteredCountries.length > 1 ? 
            <div id='countries'>
                <ul>
                    {filteredCountries.length <= 10 ? 
                    filteredCountries.map(country => (
                        <li key={country.name.common} >{country.name.common}  <button key={country.name.common} onClick={() => handleShowCountry(country)}>show</button></li>
                    )) : 
                    'Too many matches, specify another filter' }
                </ul>
            </div>
            : ''}
        </div>
    )
}

export default Form