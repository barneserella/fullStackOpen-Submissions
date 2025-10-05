import Form from './components/Form'
import Countries from './components/Countries'
import { useEffect, useState } from 'react'
import countriesService from './services/countries'


function App() {

  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  
  useEffect(() => {

    countriesService
      .getAll()
      .then(country => {
        setCountries(country)
      })
  }, [])
  console.log(`render ${countries.length} countries`)
  console.log(countries[0].name)
  console.log(countries)

  const searchCountries = (event) => {
    event.preventDefault()
    console.log('Event at ', event.target)
    console.log(event.target.value)

    const countryExists = countries.find((country)=> country.name.common.toLowerCase() === newCountry.toLowerCase() )
    console.log(countryExists)
  }

  return (
    <>
      <Form newCountry={newCountry} searchCountries={searchCountries} />
      <Countries />
    </>
  )
}

export default App
