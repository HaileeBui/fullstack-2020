import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  return(
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
      {course.parts.map( (item,index) => <Part key={item.id} part={item}/>)}
    </div>
  )
}

const Course = ({course}) => {
  console.log("course", course)
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Courses = ({courses}) =>{
  console.log("courses", courses);
  return (
    <div>
      {courses.map((item) => <Course key={item.id} course={item}/>)}
    </div>
  )
}

const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]  
  return <Courses courses={courses} />
}
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)