import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(props.points)
  
  const setOnePoint = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
  }
  
  const mostPoints = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      <p>has {points[selected]} votes</p>
      <button onClick={() => setOnePoint()}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6 + 0))}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostPoints]}
      <br></br>
      <p>has {points[mostPoints]} votes</p>
    </div>
  )
}

const emptyArray = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} points={emptyArray} />,
  document.getElementById('root')
)