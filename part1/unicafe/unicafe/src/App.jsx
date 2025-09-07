import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick} >{props.text}</button>

const StatisticLine = (props) => {
    return (
      <div>
        {props.text} {props.stat}
      </div>
    )
}

const Statistics = (props) => {
  if(props.all === 0){
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
    <table>
      <tbody>
      <tr>
        <td><StatisticLine  text="good" stat={props.good} /></td>
      </tr>
      <tr>
        <td><StatisticLine  text="neutral" stat={props.neutral} /></td>
      </tr>
      <tr>
        <td><StatisticLine  text="bad" stat={props.bad} /></td>
      </tr>
      <tr>
        <td><StatisticLine  text="all" stat={props.all} /></td>
      </tr>
      <tr>
        <td><StatisticLine  text="average" stat={props.average} /></td>
      </tr>
      <tr>
        <td><StatisticLine  text="positive" stat={props.positive * 100} />%</td>
      </tr>
      </tbody>
    </table>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    let sum = updatedGood + neutral + bad
    setAll(sum)
    let ave = ((updatedGood * 1) + (bad * -1)) / sum
    setAverage(ave)
    let pos = updatedGood / sum
    setPositive(pos) 
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    let sum = good + updatedNeutral + bad
    setAll(sum)
    let ave =  ((good * 1) + (bad * -1)) / sum
    setAverage(ave)
    let pos = good / sum
    setPositive(pos)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    let sum = good + neutral + updatedBad
    setAll(sum)
    let ave = ((good * 1) + (updatedBad * -1)) / sum
    setAverage(ave)
    let pos = good / sum
    setPositive(pos)
  }

  return (
    <div>
      <h2>give feedback</h2>

      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App