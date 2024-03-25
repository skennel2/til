# CSRF
csrf가 가능한 이유는 인증정보를 클라이언트 측에서 쿠기로 관리하는 것은 널리쓰이고있고
정상적인 HTTP요청을 흉내낸 악의적인 HTTP요청을 만들어내는것이 얼마든지 가능하기 떄문이다. 

공격자는 악의적인 HTTP요청을 유도하는 페이지로 사용자를 유도한다.
클라이언트가 가진 쿠키의 인증정보가 해당 HTTP요청에 실리기 떄문에 서버는 해당요청이 해커의 의도인지 알지못한다. 


# 스프링의 방어법
스프링은 다음의 CSRF공격을 막기위한 두가지 방법을 제공한다.
* The Synchronizer Token Pattern
* Specifying the SameSite Attribute on your session cookie

# 제약조건 멱등성을 지킨 HTTP메소드
The Synchronizer Token Pattern을 적용하기 위해서는 
GET, HEAD, OPTIONS, TRACE 메소드의 HTTP 요청은 어플리케이션의 상태를 변경하지 않는다는것이 보장되어야한다. 

# Synchronizer Token Pattern
각각의 HTTP요청에 랜덤하게 생성된 CSRF 토큰을 실어 전송하는 방법이다.
해당 토큰은 세션단위로 생선되어, 공격자는 이 토큰을 알아낼 방법이 없다.

멱등성이 지켜져야하는 이유는 악의적인 스크립트가 실행되는 위치는 정상적인 사용자의 브라우저일 것이고 
정상적인 사용자의 브라우저에서 악의적인 GET요청이 실행되는 것은 아무 문제가 없기 때문이다.

```html
<input type="hidden"
    name="_csrf"
    value="4bfd1575-3ad1-4d21-96c7-4ef2d9f86721"/>
```

# SameSite 속성


# 참고 
https://jake-seo-dev.tistory.com/78