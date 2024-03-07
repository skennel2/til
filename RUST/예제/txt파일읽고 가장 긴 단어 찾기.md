```rust
let mut file = File::open("./test.txt").unwrap();

let mut file_contents = String::new();
file.read_to_string(&mut file_contents).unwrap();


let lines: Vec<&str> = file_contents.lines().collect();

let mut cnt = 0;

let mut largest_word = String::from("");
let mut largest_word_line = 0;
for line in lines {
    cnt = cnt + 1;

    for word in line.split_whitespace() {
        if word.chars().count() > largest_word.chars().count() {
            largest_word = word.to_string();
            largest_word_line = cnt;
        }
    }
}

println!("{} line: {},", largest_word_line, largest_word);
```