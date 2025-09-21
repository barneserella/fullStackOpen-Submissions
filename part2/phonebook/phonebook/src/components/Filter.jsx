

const Filter = ({ newSearch, setNewSearch }) => {

    
    
    console.log("props will go here...")
    return (
        <div>filter shown with <input value={newSearch} onChange={(event) => setNewSearch(event.target.value)} /></div>
    )
}

export default Filter