# 채널로 스레드간 데이터 공유
mpsc는 복수 생산자, 단일 소비자 (multiple producer, single consumer) 의 약어
mpsc::channel::<String>(); 이 코드는 2개짜리 튜플을 리턴하고 첫번째는 송신자, 두번째는 수신자이다.
아래 예제는 송신 스레드와 수신 스레드 2개를 만들어 스레드간 통신을 하는 예제이다.

전송은 send 수신은 recv로한다.
recv는 스레드의 실행을 블록시키고 채널로 부터 값을 받을때까지 기다린다. 
try_recv는 블록시키지 않고 즉시 Result<T, E>를 리턴한다. 
이때 전송받은 값이 있다면 Ok(T)를 아니면 E를 리턴한다.
루프안에서 블록없이 전송값을 처리할 때 유용하다.

```rust
// tx는 송신자, rx는 수신자
let (tx, rx) = mpsc::channel::<String>();

// 송신 스레드 생성
thread::spawn(move || {
    // 채널로 값 전송
    let value = String::from("apple");
    tx.send(value).unwrap();
    thread::sleep(Duration::from_secs(1));

    // 채널로 두번째 값 전송
    let value2 = String::from("banana");
    tx.send(value2).unwrap();
    thread::sleep(Duration::from_secs(1));
});

// 수신 스레드 생성
thread::spawn(move || {
    for received in rx {
        println!("Got: {}", received);
    }
});

// result
// Got: apple
// Got: banana
```

## 소유권 이동
값을 다른 스레드로 보내고나서 그 값이 수정되거나 버려지는 상황을 원천 차단한다. 

```rust
thread::spawn(move || {
    let val = String::from("hi");
    // send는 인자의 소유권을 요구한다.
    tx.send(val).unwrap();

    // 컴파일에러
    println!("val is {}", val);
});
``` 

## 의문1 
송신과 수신을 하나의 스레드에서 처리한다면? -> 동작한다.

```rust
thread::spawn(move || {
    // 채널로 값 전송
    let value = String::from("apple");
    tx.send(value).unwrap();
    thread::sleep(Duration::from_secs(1));

    // 수신
    // 같은 스레드라도 동작한다.
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
});
```

## 의문2 
수신을 여러 스레드에서 시도한다면? -> 컴파일 에러

```rust
thread::spawn(move || {
    // 채널로 값 전송
    let value = String::from("apple");
    tx.send(value).unwrap();

    thread::sleep(Duration::from_secs(1));
});

// 이 시점에 rx의 소유권이 이동했다. 
thread::spawn(move || {
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
});

// complie error
// 소유권이 넘어간 rx사용 
thread::spawn(move || {
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
});
```

## 다중 송신자 단일 수신자

```rust
let (tx, rx) = mpsc::channel::<String>();
// tx2를 clone해서 다중 송신자를 구현한다.
let tx2 = tx.clone();
thread::spawn(move || {
    // 채널로 값 전송
    let value = String::from("apple");
    tx.send(value).unwrap();
});

thread::spawn(move || {
    // 채널로 값 전송
    let value = String::from("banana");
    tx2.send(value).unwrap();
});

thread::spawn(move || {
    loop {
        match rx.try_recv() {
            Ok(val) => println!("{}", val),
            _ => {},
        }
    }
});
```