const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const array = [];
    course.parts.map(item => array.push(item.exercises));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = array.reduce(reducer);
    return (
        <p><strong>Number of exercises {sum}</strong></p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((item, index) => <Part key={item.id} part={item} />)}
        </div>
    )
}

const Course = ({ course }) => {
    console.log("course", course)
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Courses = ({ courses }) => {
    console.log("courses", courses);
    return (
        <div>
            {courses.map((item) => <Course key={item.id} course={item} />)}
        </div>
    )
}
export default Courses;