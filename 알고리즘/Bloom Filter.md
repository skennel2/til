# 역할 
어떤 값이 집합에 속해있는지를 판별
없다고 판별하는 값은 실제로 없다.
있다고 판별하는 값은 실제로는 없을수도 있다. (확률적 자료구조)
때문에 없다고 판별되는 값은 실제 집합에서 찾을 필요가 없다.

# 사용처
dbms full scan 회피

# javascript 구현체 예시

```bash
npm install bloom-filters
```

bloom filter 생성과 사용 

```javascript 
// 첫번째 인자 필터의 비트크기, 두번째 인자 사용할 해시함수 갯수
// 커질수록 정확도가 높아진다.
this.bloomFilter = new BloomFilter(1000, 4);

this.bloomFilter.add(key);
this.bloomFilter.has(key);
```

직렬화, 역직렬화
```javascript 
const bloomJson = this.bloomFilter.saveAsJSON();
this.bloomFilter = BloomFilter.fromJSON(JSON.parse(bloomJson))
```
