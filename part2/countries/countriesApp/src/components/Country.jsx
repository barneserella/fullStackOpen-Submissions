const Country = ( {countryName, countryLanguages, imageOfFlag, area, capital, temperature, wind, imageIcon} ) => {
    return (
        <div>
            <h1>{countryName}</h1>

            <div>Capital {capital}</div>
            <div>Area {area}</div>

            <h2>Languages</h2>

            <ul>
                {countryLanguages.map(language => ( 
                    <li key={language}>{language}</li>)
                )}
            </ul>
            <img src={imageOfFlag} alt="image of country flag" />

            <h3>Weather in {capital}</h3>

            <div>Temperature {temperature} C</div>

            <img src={imageIcon} alt="weather image" />

            <div>Wind {wind} mph</div>
        </div>
    )
}

export default Country;