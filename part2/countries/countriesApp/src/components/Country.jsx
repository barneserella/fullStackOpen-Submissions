const Country = ( {countryName, countryLanguages, imageOfFlag, area, capital} ) => {
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

        </div>
    )
}

export default Country;