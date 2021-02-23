import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pressGood = () => setGood(good + 1);
  const pressNeutral = () => setNeutral(neutral + 1);
  const pressBad = () => setBad(bad + 1);
  const all = () => good+neutral+bad;
  const average = () => (bad*(-1) + good*1)/all();
  const positive = () => good/all()*100;
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
      <p>all {all()}</p>
      <p>average {average()}</p>
      <p>positive {positive()}%</p>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
