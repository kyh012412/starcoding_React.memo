import React from 'react';

const Child = ({ name, age }) => {
  console.log('자녀 컴포넌트 렌더링!');
  return (
    <div
      style={{
        border: '2px solid powderblue',
        padding: '10px',
        margin: '10px',
      }}
    >
      <h1>자녀</h1>
      <p>name: {name}</p>
      <p>age: {age}살</p>
    </div>
  );
};

export default Child;
