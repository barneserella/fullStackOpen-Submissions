import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ( props ) => {
    console.log("Course courses: ", props)
    const { course } = props
    return (
        <div>
            <Header  course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;