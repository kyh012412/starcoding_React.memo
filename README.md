# 별코딩 컴포넌트 최적화

리액트에서는 기본적으로 부모컴포넌트가 렌더링이 되면 자식컴포넌트도 랜더링이 됨

![컴포넌트렌더링 동시에](./public/img/컴포넌트렌더링동시에.png)

# React.memo

![React.memo예시](./public/img/컴포넌트동시에.png)

![prop.check](./public/img/propcheck1.png)
prop가 바뀌지 않았다면 이미 렌더링한 화면을 재사용

React.memo의 memo는 memoization을 뜻함

## React.memo를 사용하기 적합한 상황

- 컴포넌트가 같은 Props로 자주 랜더링 될 때
- 컴포넌트가 렌더링이 될때마다 복잡한 로직을 처리해야한다면

주의점 : React.memo는 **_오직 Props 변화에만_** 의존하는 최적화 방법

만약에 useState,useReducer,useContext를 사용한다면
Props의 변화가 없더라도 state나 context가 변한다면 다시 렌더링됨을 알아야한다.

### React.memo 사용방법

최적화하고 싶은 자식 함수형 컴포넌트를
memo()로 감싸준다.

ex)

```js
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
```

최적화 하고싶은 부분을 memo()로 감싼다.
렌더링이 될 상황에 놓일 때마다 prop체크를 하게된다.
props에 변화가 없다면 렌더링을 하지 않는다.

보내는 값에 객체에나 함수가 있으면
서로 다른주소를 사용해서 props의 변화로 감지해버리니
객체에는 useMemo를 써야하고 함수는 useCallback을 써서 만들어줘야 쓸모없는 자식 함수형 컴포넌트의 리랜더링을 막을수 있다.  
ex)

```js
import { useCallback, useMemo, useState } from 'react';
import './App.css';
import Child from './component/Child';

function App() {
  const [parentAge, setParentAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  const name = useMemo(() => {
    return {
      lastName: '홍',
      firstName: '길동',
    };
  }, []);

  const tellMe = useCallback(() => {
    console.log('길동아 그거해');
  }, []);

  console.log('부모 컴포넌트 렌더링!');

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
      <Child name={name} tellMe={tellMe} />
    </div>
  );
}

export default App;
```

핵심(객체에 useMemo 함수에 useCallback을 사용해야함)

```js
const name = useMemo(() => {
  return {
    lastName: '홍',
    firstName: '길동',
  };
}, []);

const tellMe = useCallback(() => {
  console.log('길동아 그거해');
}, []);
```
