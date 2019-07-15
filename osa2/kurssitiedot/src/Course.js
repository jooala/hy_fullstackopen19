import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
        </div>
    )
}

const Part = ({ part }) => {
    return (
            <p>{part.name} {part.exercises}</p>
    )
}

const Content = (props) => 
  props.parts.map(part =>
    <Part key={part.id} part={part}/>
    )


const Total = (props) => {
  const reducer = props.parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0)
    return (
        <div>
            <p>total of exercises {reducer}</p>
        </div>
    )
}

const Course = (props) => {
  return (
  <div>
    <Header name={props.course.name}/>
    <Content parts={props.course.parts}/>
    <Total parts={props.course.parts}/>
  </div>
  )
}

export default Course