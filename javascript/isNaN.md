NaN 타입은 숫자가 아님을 나타낸다. 
주로 숫자로써 연산을 시도 했는데 결과가 숫자가 아닐때 리턴되는 값이다.
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

isNaN 은 인자를 우선 암묵적으로 숫자형으로 변환하고 isNaN인지 판단한다.
Number.isNaN은 인자가 NaN이어야지만 true를 리턴한다.