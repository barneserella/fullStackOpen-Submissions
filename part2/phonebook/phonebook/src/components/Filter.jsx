

const Filter = ({ newSearch, setNewSearch }) => {

    return (
        <div>filter shown with <input value={newSearch} onChange={(event) => setNewSearch(event.target.value)} /></div>
    )
}

export default Filter