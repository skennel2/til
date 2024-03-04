파일 읽기
```rust
// 파일을 읽기모드로 연다. 
// 읽기모드라서 write등의 쓰기 메소드를 호출하면 에러
let file = File::open("./test.dd");
```

파일 쓰기
```rust 
let mut file = OpenOptions::new()
    // true로 줘야 write등으로 쓸수있다. 
    .write(true)
    .read(true) 
    .open("./test.dd")
    .unwrap();

// 타입을 u8로 명시해주어야한다.
let data: Vec<u8> = "12345".bytes().collect();

// write, append 모드가 아니면 No such file or directory
// 파일 기존내용을 &data로 덮어쓴다.
file.write(&data).unwrap();
``` 

파일 내용추가
```rust 
let mut file = OpenOptions::new()
    .append(true)
    .read(true) // true로 줘야 write등으로 쓸수있다. 
    .open("./test.dd")
    .unwrap();

// 타입을 u8로 명시해주어야한다.
let data: Vec<u8> = "12345".bytes().collect();

// append 모드이면 기존 파일내용에 &data를 추가한다. 
file.write(&data).unwrap();
``` 
