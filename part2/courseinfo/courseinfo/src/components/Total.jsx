const Total = (props) => {
    console.log("Total props: ", props)
    const { parts } = props
    
    return (
        <>
            <p>total of { parts.reduce((acc, part) => acc + part.exercises, 0) } exercises</p>
        </>
    )
}

export default Total;