import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleAction}> {props.text}</button>
)

const Statistic = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>
)

const Statistics = (props) => {
    if (props.all === 0) { 
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="good" value={props.good}/>
                    <Statistic text="neutral" value={props.neutral}/>
                    <Statistic text="bad" value={props.bad}/>
                    <Statistic text="all" value={props.all}/>
                    <Statistic text="average" value={props.average}/>
                    <Statistic text="positive" value={props.positive}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = (good/all) * 100 + "%"
  return (
    <div>
        <h1>give feedback</h1>
        <Button handleAction={() => setGood(good + 1)} text="good"/>
        <Button handleAction={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button handleAction={() => setBad(bad + 1)} text="bad"/>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)