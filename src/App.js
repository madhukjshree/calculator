
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [inputs, setInputs] = useState([]);
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);

    const handleOperands = (value) => {
        switch (value) {
            case 'C':
                setInputs([]);
                setResult(null);
                break;
            case '=':
                calculateResult();
                break;

            default:
                if (
                    (inputs.length === 0 && typeof value == 'string' && (value === '*' || value === '/')) ||
                    (inputs.length === 1 &&
                        typeof value == 'string' &&
                        (value === '*' || value === '/') &&
                        typeof inputs[0] == 'string')
                )
                    return;
                setInputs((prev) => {
                    const lastValue = prev[prev.length - 1];
                    const prevInput = [...prev];

                    if (typeof value == 'string' && typeof lastValue == 'string') {
                        prevInput.splice(prevInput.length - 1, 1, value);
                        return [...prevInput];
                    }
                    if (typeof value == 'number' && typeof lastValue == 'number') {
                        prevInput.splice(prevInput.length - 1, 1, lastValue * 10 + value);
                        return [...prevInput];
                    }
                    return [...prevInput, value];
                });
                break;
        }
    };

    const calculateResult = () => {
        if (inputs.length < 3) {
            setResult('Error');
            return;
        }
        const resArr = [...inputs];
        if (resArr[0] === '-') {
            resArr.shift();
            resArr[0] = -1 * resArr[0];
        }
        if (typeof resArr[resArr.length - 1] == 'string') resArr.pop();
        if (typeof resArr[0] == 'string') resArr.shift();

        resArr.forEach((item, index) => {
            if (item === '-' && index < resArr.length - 1) {
                resArr.splice(index, 1, '+');
                resArr.splice(index + 1, 1, -1 * resArr[index + 1]);
            }
        });

        'BODMAS'.split('').forEach((factor) => {
            switch (factor) {
                case 'D':
                    for (let index = 0; index < resArr.length - 1; ) {
                        const item = resArr[index];
                        if (item === '/') {
                            const left = resArr[index - 1];
                            const right = resArr[index + 1];
                            resArr.splice(index - 1, 3, left / right);
                        } else index++;
                    }

                    break;
                case 'M':
                    for (let index = 0; index < resArr.length - 1; ) {
                        const item = resArr[index];
                        if (item === '*') {
                            const left = resArr[index - 1];
                            const right = resArr[index + 1];
                            resArr.splice(index - 1, 3, left * right);
                        } else index++;
                    }
                    break;
                case 'A':
                    for (let index = 0; index < resArr.length - 1; ) {
                        const item = resArr[index];
                        if (item === '+') {
                            const left = resArr[index - 1];
                            const right = resArr[index + 1];
                            resArr.splice(index - 1, 3, left + right);
                        } else index++;
                    }
                    break;
            }
        });
        setResult(resArr[0]);
    };

    useEffect(() => {
        setInputText(() => inputs.join(''));
    }, [inputs]);

    return (
        <section className='main-container'>
            <h1>React Calculator</h1>
            <input type='text' value={inputText} readOnly />
            {result !== undefined || result !== null ? <div>{result}</div> : null}
            <section className='button-container'>
                <button className='btn' onClick={() => handleOperands(7)}>
                    7
                </button>
                <button className='btn' onClick={() => handleOperands(8)}>
                    8
                </button>
                <button className='btn' onClick={() => handleOperands(9)}>
                    9
                </button>
                <button className='btn' onClick={() => handleOperands('+')}>
                    +
                </button>
                <button className='btn' onClick={() => handleOperands(4)}>
                    4
                </button>
                <button className='btn' onClick={() => handleOperands(5)}>
                    5
                </button>
                <button className='btn' onClick={() => handleOperands(6)}>
                    6
                </button>
                <button className='btn' onClick={() => handleOperands('-')}>
                    -
                </button>
                <button className='btn' onClick={() => handleOperands(1)}>
                    1
                </button>
                <button className='btn' onClick={() => handleOperands(2)}>
                    2
                </button>
                <button className='btn' onClick={() => handleOperands(3)}>
                    3
                </button>
                <button className='btn' onClick={() => handleOperands('*')}>
                    *
                </button>
                <button className='btn' onClick={() => handleOperands('C')}>
                    C
                </button>
                <button className='btn' onClick={() => handleOperands(0)}>
                    0
                </button>
                <button className='btn' onClick={() => handleOperands('=')}>
                    =
                </button>
                <button className='btn' onClick={() => handleOperands('/')}>
                    /
                </button>
            </section>
        </section>
    );
}

export default App;