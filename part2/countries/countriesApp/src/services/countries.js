import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
// const VITE_API_KEY = 'get from env file'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const search = () => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

const getWeather = (capital) => {
   const request = axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${VITE_API_KEY}&q=${capital}&days=1&aqi=no&alerts=no`)
   return request.then(response => response.data)
}


export default { getAll, search, getWeather }