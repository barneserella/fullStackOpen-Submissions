const Form = ({ newCountry, searchCountries }) => {
    return (
        <div>
            <form  onChange={searchCountries}>
                <div>find countries </div><input value={newCountry} type="text" />
            </form>
            <div id='countries'></div>
        </div>
    )
}

export default Form