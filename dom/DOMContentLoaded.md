# DOMContentLoaded
1. dom 이벤트중 하나
1. HTML 문서의 초기 DOM(Document Object Model)이 완전히 로드되고 파싱된 후 발생
1. JavaScript 코드가 DOM 요소에 안전하게 접근할 수 있도록 보장
1. 외부 리소스(이미지, 스타일시트, 스크립트 등의 로딩)가 완료되기를 기다리지 않고, HTML과 내부 스크립트만 처리된 후 실행
    1. window.onload: 모든 리소스(이미지, iframe 등 포함)가 로드된 후 발생. DOMContentLoaded보다 늦게 실행됨.
    1. DOMContentLoaded: DOM만 준비되면 바로 발생하므로 더 빠름.

```
    HTML 파싱 시작 → DOM 생성 → <script> 실행 → DOM 완성 → DOMContentLoaded → 외부 리소스 로드 완료 → load 이벤트
```