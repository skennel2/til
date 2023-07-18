# AbstractAuthenticationProcessingFilter
org.springframework.web.filter.GenericFilterBean 
-> org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter

HTTP 베이스의 인증요청을 처리하는 책임을 가지는 추상클래스



```java 
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
		return null;
	}
```

# 참고 
[https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/AbstractAuthenticationProcessingFilter.html]

# 이벤트 발행 
인증에 성공하면 InteractiveAuthenticationSuccessEvent를 발생시킨다.
