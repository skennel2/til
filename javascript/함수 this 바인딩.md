```javascript
class Named {
    name: string = "test";

    printName() {
        // 여기서의 this는 호출하는 방식에 따라 결정됩니다.
        console.log("현재 객체:", this); 
        console.log("이름:", this?.name);
    }
}

const named = new Named();

// --- 케이스 1: 정상 호출 ---
console.log("--- 케이스 1 실행 ---");
named.printName(); 
// 출력: 현재 객체: Effect { name: '불 효과' }, 효과 이름: 불 효과


// --- 케이스 2: 변수에 담아서 호출 (문제 발생) ---
console.log("\n--- 케이스 2 실행 ---");
const extractedFn = named.printName; // 메서드를 변수에 할당 (참조만 복사)

try {
    extractedFn(); 
    // 출력: 현재 객체: undefined
    // 에러 발생: Cannot read properties of undefined (reading 'name')
} catch (e) {
    console.log("에러 발생: this가 사라졌습니다!");
}
```

왜 이런 일이 벌이질까?  
자바스크립트에서 this는 **"함수가 어디에 정의되었는가"**가 아니라 **"함수를 어떻게 호출했는가"**에 따라 결정된다.  
myEffect.printName(): 점(.) 연산자를 통해 호출하면 자바스크립트 엔진은 myEffect가 this라고 암시적으로 판단합니다. (암시적 바인딩)  
const fn = named.printName;: 이렇게 하는 순간 fn에는 "이름을 출력한다"는 함수 알맹이만 들어간다. myEffect라는 정보는 복사되지 않는다.  
fn(): 이제 이 함수는 혼자 호출된다. 주인(객체) 없이 호출된 함수의 this는 기본적으로 undefined(Strict Mode)가 된다.  