# Trait
타 언어의 인터페이스와 유사하다. 

```rust
trait Worker {
    fn do_work(&self);
}
```

## trait의 함수를 호출하기 위해선 자신의 범위로 trait을 가져와야한다 (use)

```rust
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    // summarize를 호출하기 위해 1번 라인에서 Summary를 범위로 가져왔다.
    println!("1 new tweet: {}", tweet.summarize());
}
```
# 참고
[https://velog.io/@jollidah/Rust-trait%EC%97%90-%EA%B4%80%ED%95%B4]