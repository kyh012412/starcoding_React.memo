import { useState } from 'react';
import './App.css';
import Child from './component/Child';

function App() {
  const [parentAge, setParentAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  return (
    <div
      style={{
        border: '2px solid navy',
        padding: '10px',
        margin: '10px',
      }}
    >
      <h1>부모</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>부모 나이 증가</button>
      <Child />
    </div>
  );
}

export default App;
