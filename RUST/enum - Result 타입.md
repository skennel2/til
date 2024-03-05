# Result enum
result enum은 러스트의 에러처리에 핵심이 된다.

1. 복구 가능한 에러
2. 복구 불가능한 에러

Result는 이중 복구 가능한 에러와 연관있다.

어떤 처리의 결과가 이상없이 처리되었거나(Ok) 복구가능한 에러(Err)인것을 표현한다.

enum의 기본적인 형태
```rust
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

사용예제
```rust
struct Error { 
    msg: String
}

struct ValueWrapper {
    value: i32,
}

fn return_result() -> Result<ValueWrapper, Error> {
    let try_value_wrapper: Result<ValueWrapper, Error> = Result::Ok(ValueWrapper { value: 1 }); 

    if ... {
        return Result::Err(Error { msg: 'error' });
    }

    try_value_wrapper
}

fn main {
    // Result타입과 match문법 사용
    match return_result() {
        Ok(val) => {
            println!("Ok {}", val.value)
        },
        Err(err) => println!("Err: {}", err.msg)
    }
}

```