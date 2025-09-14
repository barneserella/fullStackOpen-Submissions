const Header = (props) => {
    console.log("Header props: ", props)
    const { course } = props
    return (
        <>
            <h2>{course.name}</h2>
        </>
    )
}

export default Header