
// function App() {
//   return (
//     <div className="App">
//       hello madhu
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';


function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const addToDisplay = (value) => {
    setDisplay(display + value);
  };

  const clearDisplay = () => {
    setDisplay('');
    setResult('');
  };

  const calculateResult = () => {
    try {
      const res = eval(display);
      if (isNaN(res)) {
        setResult('NaN');
      } else if (!isFinite(res)) {
        setResult('Infinity');
      } else {
        setResult(res.toString());
      }
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="App">
      <div id="calculator">
        <input type="text" id="display" value={display} readOnly />
        <div>
          <button onClick={() => addToDisplay('7')}>7</button>
          <button onClick={() => addToDisplay('8')}>8</button>
          <button onClick={() => addToDisplay('9')}>9</button>
          <button onClick={() => addToDisplay('+')}>+</button>
        </div>
        <div>
          <button onClick={() => addToDisplay('4')}>4</button>
          <button onClick={() => addToDisplay('5')}>5</button>
          <button onClick={() => addToDisplay('6')}>6</button>
          <button onClick={() => addToDisplay('-')}>-</button>
        </div>
        <div>
          <button onClick={() => addToDisplay('1')}>1</button>
          <button onClick={() => addToDisplay('2')}>2</button>
          <button onClick={() => addToDisplay('3')}>3</button>
          <button onClick={() => addToDisplay('*')}>*</button>
        </div>
        <div>
          <button onClick={() => addToDisplay('0')}>0</button>
          <button onClick={() => addToDisplay('/')}>/</button>
          <button onClick={clearDisplay}>C</button>
          <button onClick={calculateResult}>=</button>
        </div>
      </div>
      <div id="result">
        <p>Result: {result}</p>
      </div>
    </div>
  );
}

export default App;

