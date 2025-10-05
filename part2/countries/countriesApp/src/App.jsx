import Form from './components/Form'
import Country from './components/Country'
import { useEffect, useState } from 'react'
import countriesService from './services/countries'


function App() {

  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  useEffect(() => {

    countriesService
      .getAll()
      .then(country => {
        setCountries(country)
      })
  }, [])
  console.log(`render ${countries.length} countries`)
  // console.log(countries[119].name.common)


  // const searchCountries = (event) => {
  //   event.preventDefault()
  //   console.log('Event at ', event.target)
  //   console.log(event.target.value)

  //   const countryExists = countries.find((country)=> country.name.common.toLowerCase() === newCountry.toLowerCase() )
  //   console.log(countryExists)
  // }
  
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
  console.log(filteredCountries)
 
  const singleCountry = filteredCountries.length === 1 ? filteredCountries[0] : null
  console.log('single country: ', singleCountry)
  // console.log('single country languages: ', Object.values(singleCountry.languages))

   const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <>
      
      <Form newSearch={newSearch} setNewSearch={setNewSearch} countries={countries} filteredCountries={filteredCountries} handleShowCountry={handleShowCountry}/>
      
      
      {singleCountry && 
        <Country countryName={singleCountry.name.common} countryLanguages={Object.values(singleCountry.languages)} area={singleCountry.area} capital={singleCountry.capital} imageOfFlag={singleCountry.flags.png} />
      }

      {selectedCountry && 
        <Country countryName={selectedCountry.name.common} countryLanguages={Object.values(selectedCountry.languages)} area={selectedCountry.area} capital={selectedCountry.capital} imageOfFlag={selectedCountry.flags.png} />
      }
    </>
  )
}

export default App
