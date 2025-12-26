
# Mixed Content
https -> http 로 자원 요청시 브라우저가 이를 위험하다고 판단하여 차단하는 현상

# 메타 태그 추가
아래의 메타 태그를 추가하면 브라우저가 알아서 모든 http요청을 https로 변환해서 요청한다.

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```