# CSRF
csrf가 가능한 이유는 정상적인 HTTP요청을 흉내낸 악의적인 HTTP요청을 만들어내는것이 얼마든지 가능하기 떄문이다. 

# 스프링의 방어법
스프링은 다음의 CSRF공격을 막기위한 두가지 방법을 제공한다.
* The Synchronizer Token Pattern
* Specifying the SameSite Attribute on your session cookie

# 제약조건 멱등성을 지킨 HTTP메소드
GET, HEAD, OPTIONS, TRACE는 어플리케이션의 상태를 변경하지 않는다는것이 보장되어야한다. 

# Synchronizer Token Pattern
각각의 HTTP요청에 랜덤하게 생성된 CSRF 토큰을 실어 전송하는 방법이다. ()


