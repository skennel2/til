# Option enum
표준 라이브러리에 정의 되어있는 Nullable한 값을 표현하는 열거형
기본적으로 포함되어 있기 때문에 Option:: 를 앞에 붙이지 않고, Some 과 None 을 바로 사용할 수 있다.

```rust
// 기본적인 정의
enum Option<T> {
    Some(T),
    None,
}
```

```rust
    // Some을 사용할 경우 타입추론이 일어난다.
    let option1 = Option::Some(32);
    // None을 사용할 경우 타입을 명시해야한다.
    let option2: Option<i32> = Option::None;
```