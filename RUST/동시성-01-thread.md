# 멀티스레드로 유발되는 문제 
1. 여러 스레드가 순서에 무관하게 데이터 혹은 리소스에 접근하는 문제, 경합조건 
1. 두 스레드가 서로를 기다려서 양쪽스레드 모두 계속 실행되는 문제, 데드락 
1. 특정한 상황에서만 발생하는 버그 유발 (아마도 실행순서에 따라 바뀌는 결과를 말하는 듯)

# thread
```rust
fn thread_기본적인_사용법() {
    let t1= thread::spawn(|| {
        for i in 1..5 {
            println!("thread1 {} ",i);
            thread::sleep(Duration::from_millis(1));
        }
        
    });

    let t2 = thread::spawn(|| {
        for i in 1..5 {
            println!("thread2 {} ",i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    thread::sleep(Duration::new(1, 0));
}
```
