import React, { memo } from 'react';

const Child = ({ name }) => {
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
      <p>lastName: {name.lastName}</p>
      <p>firstName: {name.firstName}</p>
    </div>
  );
};

export default memo(Child);
//최적화 하고싶은 부분을 memo()로 감싼다.
//렌더링이 될 상황에 놓일 때마다 prop체크를 하게된다.
//props에 변화가 없다면 렌더링을 하지 않는다.
