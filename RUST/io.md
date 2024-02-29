```rust 
    let mut file = OpenOptions::new()
        .write(true)
        .read(true)
        .open("./test.dd")
        .unwrap();

    let data: Vec<u8> = "12345".bytes().collect();
    file.write(&data).unwrap();
```