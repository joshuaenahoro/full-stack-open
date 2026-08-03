import { useState } from 'react';

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, average, all }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={`${(good / all) * 100} %`} />
      </tbody>
    </table>
  );
};

const Button = ({ setterFn, text }) => (
  <button onClick={() => setterFn((n) => n + 1)}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);

  const all = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button setterFn={setGood} text="good" />
        <Button setterFn={setNeutral} text="neutral" />
        <Button setterFn={setBad} text="bad" />
      </div>
      <h2>statistics</h2>

      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          all={all}
        />
      )}
    </div>
  );
};

export default App;
