```javascript
const requestId = requestAnimationFrame(callback);
```
callback: 다음 프레임에 실행될 함수로, 단일 인자(timestamp)를 받습니다.
timestamp: RAF가 호출된 시점의 밀리초 단위 시간(DOMHighResTimeStamp).

1. 브라우저에게 다음 화면 리프레시(보통 60Hz, 즉 초당 60프레임) 전에 지정된 콜백 함수를 실행하도록 요청하는 메서드입니다.
2. 브라우저의 렌더링 파이프라인(예: 스타일 계산 → 레이아웃 → 페인팅) 직전에 실행됩니다.
3. setTimeout이나 setInterval과 달리, RAF는 브라우저가 최적의 타이밍을 결정하므로 불필요한 계산을 줄입니다.
4. 탭이 비활성화되거나 백그라운드에 있을 때 자동으로 일시 중지되어 배터리와 CPU 리소스를 절약합니다.
5. RAF는 한 번만 실행되며, 연속적인 애니메이션을 위해서는 콜백 내에서 RAF를 재귀적으로 호출해야 합니다.