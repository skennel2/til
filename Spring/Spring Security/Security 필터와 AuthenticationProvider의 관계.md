Security 필터는 HttpServletRequest, HttpServletResponse를 파싱해 원하는 데이터를 추리거니 아니면 변경할수도 있다.

Security 필터는 요청정보로 Authentication객체를 만들어 ProviderManager에게 인증을 요청한다.
```java
return getAuthenticationManager().authenticate(new CustomAuthenticationToken(email, credentials));
```

ProviderManager는 전달받은 Authentication 을 처리할수 있는 AuthenticationProvider를 찾아 처리를 위임한다 (Chain Of Responsibility)

그러므로 Security 필터는 AuthenticationProvider를 알 필요는 없고, ProviderManager만 알고있으면 된다.

# 참고 
[https://gregor77.github.io/2021/05/18/spring-security-03/]