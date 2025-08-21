import { useState } from 'react';
import './App.css';

function App() {
  const [numA, setNumA] = useState('');
  const [numB, setNumB] = useState('');
  const [result, setResult] = useState('');

  const addNumbers = async () => {
    try {
      // The fetch URL points to your Spring Boot application on port 8082
      const response = await fetch(`http://localhost:8081/calc1/add/${numA}/${numB}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Error: Could not connect to API.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spring Boot Calculator</h1>
        <div className="input-group">
          <input
            type="number"
            value={numA}
            onChange={(e) => setNumA(e.target.value)}
            placeholder="Number A"
          />
          <input
            type="number"
            value={numB}
            onChange={(e) => setNumB(e.target.value)}
            placeholder="Number B"
          />
          <button onClick={addNumbers}>Add</button>
        </div>
        {result && <p className="result-text">{result}</p>}
      </header>
    </div>
  );
}

export default App;