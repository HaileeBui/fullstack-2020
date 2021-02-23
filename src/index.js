import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pressGood = () => setGood(good + 1);
  const pressNeutral = () => setNeutral(good + 1);
  const pressBad = () => setBad(good + 1);

  return (
    <div style={{margin: 10}}>
      <h1>give feedback</h1>
      <div>
        <button onClick={pressGood}>good</button>
        <button onClick={pressNeutral}>neutral</button>
        <button onClick={pressBad}>bad</button>
      </div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
