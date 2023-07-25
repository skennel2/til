# 스프링 시큐리티의 기본적인 HTTP Header 세팅 
아래는 디폴트이며 원한다면 커슼

## Cache-Control 
```
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
```

 no-cache 캐시를 쓰기전에 서버에 캐시를 써도되는지 여부를 묻는다. 
 no-store 아무것도 캐싱하지 않는다. 
 must-revalidate 만료된 캐시만 서버에 확인을 받도록 한다. 

참고로 Cache-Control 추가적인 옵션은  public, private이 있다.
public, private public이면 공유 캐시(또는 중개 서버)에 저장해도 된다는 뜻이고 private이면 브라우저같은 특정 사용자 환경에만 저장하라는 뜻입니다.

__스프링 은 디폴트로 캐싱사용은 비활성화한다.__

## Content Type Options
```
X-Content-Type-Options: nosniff
```

 content sniffing을 막는다. 지정된 MIME 타입으로만 Content Type을 해석한다.


## HTTP Strict Transport Security
```
Strict-Transport-Security: max-age=31536000 ; includeSubDomains ; preload
```

웹브라우저에게 HTTPS 프로토콜만 접속하게 강제하는 기능이다.
SSL Stripping 방어

## HPKP
 Man In Middle Attack을 막는 옵셥이라는데 deprecated되는 옵션인듯한다.

## X-Frame-Options
```
X-Frame-Options: DENY
```

내 사이트가 iframe으로 불러와질수있는지 여부이다. 
가능하다면 clickjacking, 디도스공격의 원인이 될수 있다. 

clickjacking을 레거시 브라우저에서 막기위해 프레임 브레이킹 코드를 작성하기도한다.

```
CSP가 clickjacking을 막는 좀더 현대적인 방식이라고 한다.
```

## X-XSS-Protection
```
X-XSS-Protection: 0
```

## Referrer-Policy
```
Referrer-Policy: same-origin
```

웹사이트가 같을 때 주소를 남깁니다.
예를 들어: https://scshim.tistory.com/entry/WebRTC란 이라는 주소에서 다른 웹사이트로 이동한다면,  
https://scshim.tistory.com/ 로 이동할 때만 주소를 남깁니다. https://naver.com 으로 이동한다면 주소를 남기지 않습니다.

참고로 Referrer-Policy를 따로 설정하지 않으면 브라우저 기본값을 따르게된다. 
크롬은 85 버전부터 기본 정책이 no-referrer-when-downgrade에서 strict-origin-when-cross-origin으로 변경되었다.

# 참고 
[레퍼런스](https://docs.spring.io/spring-security/reference/features/exploits/headers.html)
https://www.zerocho.com/category/HTTP/post/5b594dd3c06fa2001b89feb9
https://dj-min43.medium.com/http-mime-%ED%83%80%EC%9E%85%EA%B3%BC-content-type-%EA%B7%B8%EB%A6%AC%EA%B3%A0-nosniff-d021557a7de
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=aepkoreanet&logNo=221575708943
https://velog.io/@sejinkim/Referrer-Policy%EC%9D%98-%EC%9D%B4%ED%95%B4
[[모던JS: 심화] 네트워크 요청 (2)](https://velog.io/@longroadhome/%EB%AA%A8%EB%8D%98JS-%EC%8B%AC%ED%99%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%9A%94%EC%B2%AD-2)
[Chrome의 기본 레퍼러 정책 변화 - strict-origin-when-cross-origin (2020.07 / Chrome v.85)](https://americanopeople.tistory.com/358)
[HTTP: Content-Type 에 대해 알아보자 (application/json, application/x-www-form-urlencoded, multipart/form-data)](https://jw910911.tistory.com/117)