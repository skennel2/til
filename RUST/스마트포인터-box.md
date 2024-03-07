# Box<T>
스택이 아닌 힙에 데이터를 저장할 수 있게한다.

```rust
let value = 8;
let value_ref = &value;

assert_eq!(value, *value_ref);

// 컴파일에러
assert_eq!(value, value_ref);

let box_value = 8;
let box_value_ref = Box::from(8);

assert_eq!(box_value, *box_value_ref);
```
