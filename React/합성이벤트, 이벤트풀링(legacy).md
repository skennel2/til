# 합성이벤트, 이벤트풀링(legacy) 
리액트 16이하에서는 합성이벤트와 이벤트풀링이라는 개념을 사용한다. 
합성이벤트란 브라우저의 원래 이벤트객체(Native Event)를 감싼 리액트만의 이벤트 객체를 말한다. 
이렇게 네이티브 이벤트객체를 바로 사용하지 않고 한번 감싸는 이유는 브라우저 호환성등의 문제를 리액트 레벨에서 해결하기 위함이다. 
이런 장점도 있지만 이벤트발생마다 추가적인 오브젝트 생성비용이 들어가니 합성이벤트 객체를 그때마다 생성하는것이 아닌 풀링으로 재활용해 속성만 바꿔치기 한다. 
이 때문에 이벤트콜백내에서 비동기 작업이 이루어질때 합성이벤트객체가 회수되어 문제가 생기는 경우가 있는데 이를 막기위한 방법으로 persist 함수를 합성이벤트 객체에서 제공한다. 

# persist 예시
아래는 persist가 필요한 이유에 대한 예시이다. 비동기 함수(setTimeout, fetch 등) 내부에서 이벤트 객체(e)에 접근하려고 할 때, 이미 해당 이벤트 객체는 풀(Pool)로 반환되어 초기화(null)되었기 때문에 에러가 발생하거나 값을 읽을 수 없다.
```javascript 
import React, { useState } from 'react';

function SearchInput() {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    // 1. 동기 실행: 이벤트 객체가 살아있으므로 정상 출력
    console.log('Sync:', e.target.value); 

    // 2. 비동기 실행 (예: 디바운싱이나 API 호출 시뮬레이션)
    setTimeout(() => {
      try {
        // 3. 리액트 16 이하에서는 여기서 문제가 발생합니다.
        // handleChange가 끝나는 순간 'e' 객체는 초기화되어 풀로 돌아갔습니다.
        // 즉, e.target은 null이 됩니다.
        console.log('Async:', e.target.value); // Error: Cannot read property 'value' of null
        
        setKeyword(e.target.value); // 상태 업데이트 실패
      } catch (error) {
        console.error('이벤트 객체가 소멸되었습니다.', error);
      }
    }, 1000);
  };

  return <input type="text" onChange={handleChange} />;
}
```

아래는 persist를 사용한 에시이다.
```javascript 
import React, { useState } from 'react';

function SearchInputFixed() {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    // 1. 이벤트 객체를 보존(persist)함
    // 이제 이 'e' 객체는 풀링 시스템에서 제외되어 가비지 컬렉터가 수거하기 전까지 유지됩니다.
    e.persist(); 

    console.log('Sync:', e.target.value);

    setTimeout(() => {
      // 2. persist() 덕분에 비동기 시점에도 e.target이 살아있음
      console.log('Async (with persist):', e.target.value); // 정상 출력
      
      setKeyword(e.target.value); // 정상 작동
    }, 1000);
  };

  return <input type="text" onChange={handleChange} />;
}
```

# 중요 참고 (React 17 이상)
React 17부터는 이벤트 풀링(Event Pooling) 개념이 삭제되었다. 따라서 최신 리액트에서는 e.persist()를 쓰지 않아도 비동기 함수에서 이벤트 객체에 정상적으로 접근할 수 있다.