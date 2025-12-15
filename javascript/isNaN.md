# isNaN
NaN 타입은 숫자가 아님을 나타낸다. 주로 숫자로써 연산을 시도 했는데 결과가 숫자가 아닐때 리턴되는 값이다.  
NaN은 같은 NaN을 포함해 어떤 값과 비교연산이 수행될때 같지 않다고 판단된다

``` bash
NaN === NaN
< false
NaN !== NaN
< true
NaN == NaN
< false
NaN != NaN
< true
```

#  isNaN, Number.isNaN 과의 차이 
isNaN 은 인자를 우선 암묵적으로 숫자형으로 변환하고 isNaN인지 판단한다. (느슨)  
Number.isNaN은 인자가 숫자형이면서 NaN이어야지만 true를 리턴한다. (엄격)  

결론적으로 ES6(2015) 이후의 모던 자바스크립트 환경에서는 무조건 Number.isNaN()을 사용하는 것이 안전하다.

```javascript
// 1. 문자열 'hello'는 숫자로 바꾸면 NaN이 됨
// 2. 그래서 true를 반환함 (우리가 원한 결과가 아닐 수 있음)
console.log(isNaN('hello')); // true

// undefined는 숫자로 바꾸면 NaN이 됨
console.log(isNaN(undefined)); // true

// 객체는 숫자로 바꾸면 보통 NaN이 됨
console.log(isNaN({})); // true

// 'hello'는 문자열이지 NaN이라는 특수 값이 아님 -> false
console.log(Number.isNaN('hello')); // false

// undefined는 undefined이지 NaN이 아님 -> false
console.log(Number.isNaN(undefined)); // false

// 오직 진짜 NaN만 true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(0 / 0)); // true
```