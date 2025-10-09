import Form from './components/Form'
import Country from './components/Country'
import { useEffect, useState } from 'react'
import countriesService from './services/countries'


function App() {

  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState(0)
  const [image,setImage] = useState('') 

  useEffect(() => {

    countriesService
      .getAll()
      .then(country => {
        setCountries(country)
      })
  }, [])
  console.log(`render ${countries.length} countries`)

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
  console.log(filteredCountries)
 
  const singleCountry = filteredCountries.length === 1 ? filteredCountries[0] : null
  console.log('single country: ', singleCountry)
  // console.log('single country languages: ', Object.values(singleCountry.languages))

  useEffect(() => {
    if(singleCountry && singleCountry.capital){
      countriesService
      .getWeather(singleCountry.capital[0])
      .then(location => {
        setTemperature(location.current.temp_c)
        setWind(location.current.wind_mph)
        setImage(location.current.condition.icon)
      })
    }
  }, [singleCountry])

  useEffect(() => {
    if(selectedCountry && selectedCountry.capital){
      countriesService
      .getWeather(selectedCountry.capital[0])
      .then(location => {
        setTemperature(location.current.temp_c)
        setWind(location.current.wind_mph)
        setImage(location.current.condition.icon)
      })
    }
  }, [selectedCountry])

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <>
      
      <Form newSearch={newSearch} setNewSearch={setNewSearch} countries={countries} filteredCountries={filteredCountries} handleShowCountry={handleShowCountry}/>
      
      
      {singleCountry && 
        <Country countryName={singleCountry.name.common} countryLanguages={Object.values(singleCountry.languages)} area={singleCountry.area} capital={singleCountry.capital} imageOfFlag={singleCountry.flags.png} temperature={temperature} wind={wind} imageIcon={image}/>
      }

      {selectedCountry && 
        <Country countryName={selectedCountry.name.common} countryLanguages={Object.values(selectedCountry.languages)} area={selectedCountry.area} capital={selectedCountry.capital} imageOfFlag={selectedCountry.flags.png} temperature={temperature} wind={wind} imageIcon={image} />
      }
    </>
  )
}

export default App
