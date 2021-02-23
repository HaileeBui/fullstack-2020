import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({text,value}) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const Statistics = (props) => {
  const all = () => props.good + props.neutral + props.bad;
  const average = () => (props.bad * (-1) + props.good * 1) / all();
  const positive = () => props.good / all() * 100;
  if(all() === 0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Statistic text='good' value={props.good}/>
      <Statistic text='neutral' value={props.neutral} />
      <Statistic text='bad' value={props.bad} />
      <Statistic text='all' value={all()} />
      <Statistic text='average' value={average()} />
      <Statistic text='positive' value={positive()} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pressGood = () => setGood(good + 1);
  const pressNeutral = () => setNeutral(neutral + 1);
  const pressBad = () => setBad(bad + 1);
  
  return (
    <div style={{ margin: 10 }}>
      <h1>give feedback</h1>
      <div>
        <Button onClick={pressGood} text='good' />
        <Button onClick={pressNeutral} text='neutral' />
        <Button onClick={pressBad} text='bad' />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
