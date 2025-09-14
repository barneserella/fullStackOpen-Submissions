import Part from "./Part";

const Content = (props) => {
    console.log("Content parts: ", props)
    const { parts } = props
    return (
        <>
            {parts.map(part => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            ))}
        

        </>
    )
}

export default Content;