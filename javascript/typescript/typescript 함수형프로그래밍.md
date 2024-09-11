# 타입스크립트 함수형 프로그래밍 

# Currying

```typescript
const sum = (a: number, b: number) => a + b;
const result = sum(10, 20);
```

To: 

```typescript
const currySum = (a: number) => (b: number) => a + b;
const result = currySum(10)(20);
```

이렇게 일반적인 함수의 인자를 하나씩 주어 연속적으로 호출하는 형태로 사용하는것을 커링이라고한다.

커링을 활용하는 예시
```tsx
const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  return (
    <form>
      <input type="text" value={form.name} onChange={handleChange("name")} />
      <input type="text" value={form.email} onChange={handleChange("email")} />
      <input type="number" value={form.age} onChange={handleChange("age")} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

# Function Composition

# 
(Functional Programming with Typescript — The Series)[https://oscar-reyes.medium.com/functional-programming-with-typescript-the-series-432c1608afab]