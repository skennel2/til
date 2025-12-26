# WeakMap 
WeakMap은 Map객체와 비슷하지만 key로 객체를 요구한다. string, number같은 원시값은 지정할수 없다. WeakMap은 key로 할당된 객체를 약하게 잡고있다. 
즉 key에 할당된 객체를 참조하는 곳이 WeakMap을 제외하고 없다면 GC의 대상이된다. GC가 수거해가면 해당하는 value도 자동으로 삭제된다. 
아래는 주요한 사용처중 하나인 DOM 요소에 메타데이터 저장하는 패턴예시이다. 
Set와 매치되는 WeakSet도 존재한다. 

```javascript 
// DOM 요소별로 클릭 횟수를 추적하는 시나리오
const clickCounts = new WeakMap<HTMLElement, number>();

function countClick(element: HTMLElement) {
    const currentCount = clickCounts.get(element) || 0;
    clickCounts.set(element, currentCount + 1);
    console.log(`클릭 횟수: ${currentCount + 1}`);
}

// 사용 예시
let myBtn = document.querySelector('#btn');

// 버튼에 데이터 매핑
clickCounts.set(myBtn, 0);

myBtn.addEventListener('click', () => countClick(myBtn));

// ... 시간이 흘러 ...

// 버튼이 화면에서 제거되고 참조가 끊김
myBtn.remove();
myBtn = null; 

// 결과:
// WeakMap은 myBtn을 '약하게' 잡고 있으므로, 
// GC가 돌 때 clickCounts 내부의 해당 엔트리(키와 값)도 자동으로 증발합니다.
// 별도의 cleanup 로직이 필요 없습니다.
```

# 참고
https://ui.toast.com/posts/ko_20210624