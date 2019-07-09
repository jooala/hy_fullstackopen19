import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
    return (
        <diV>
            <h1>{course.name}</h1>
        </diV>
    )
}
const Part = (part) => {
    return (
        <div>
            <p>{part.name} {part.total}</p>
        </div>
    )
}
const Content = (props) => {
    return (
        <div>
            <Part name={props.part1} total={props.total1}/>
            <Part name={props.part2} total={props.total2}/>
            <Part name={props.part3} total={props.total3}/>
        </div>
    )
}

const Total = (exercises) => {
    return (
        <div>
            <p>{exercises.number1 + exercises.number2 + exercises.number3}</p>
        </div>
    )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content part1={part1} part2={part2} part3={part3} total1={exercises1} total2={exercises2} total3={exercises3}/>
      <Total number1={exercises1} number2={exercises2} number3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))