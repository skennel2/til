
프론트단에서 number 타입이 가지는 문제에는 어떤것들이 있고 어떻게 해결해야하는지 또 공통에서는 어떤것들은 지원하고 지원예정인지에 대해서 말씀드리려고합니다.

mysql -> decimal 
java -> BigDecimal 
javascript -> number 

#고정소수점
고정소수점은 금액등 정확한 값이 필요한 경우에 사용

1. 크기이슈 
MySQL decimal 타입 17.4의 크기
정수부 13자리 
소수점이하 자릿수 4

1500000000000.1234 (1조 5천억원)
1500000000000.1233 

1. 연산에러  
200000 * 0.009 = 1800원
```javascript
200000 * 0.009 // 1799.9999999999998
```

``` javascript
(200000 * 0.009).toFixed() // "1800"
```

33300 * 0.009 = 299.7원
```javascript
(33300 * 0.009).toFixed() // "300"
```

이 경우엔 최대 소수점 자릿수를 인자로 
```javascript
(33300 * 0.009).toFixed(3) // "299.700"
```

1. toFixed 의 한계


1. 원단위 절사코드 

```javascript
Math.floor(Number((tpayAm * eminRt).toFixed(3)) / 10) * 10;
```

1. decimal.js

1. DecimalUtil

```javascript 
const value = DecimalUtil.init('9000000000000.1234')
    .get()

// LastCutType.ceil(절상), LastCutType.round(반올림), LastCutType.trunc(절사)
const value2 = DecimalUtil.init(33300)
    .mul(0.009)
    .toFixed(-1, LastCutType.trunc) 
    .get()

```
---

Math.floor(Number((this.coalNan(values.tpayAm) * this.coalNan(this._payOptionItem.eminRt)).toFixed(3)) / 10) * 10

Decimal -> string 
