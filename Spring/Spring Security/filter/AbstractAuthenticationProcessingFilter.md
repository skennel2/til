# AbstractAuthenticationProcessingFilter
org.springframework.web.filter.GenericFilterBean 
-> org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter

HTTP 베이스의 인증요청을 처리하는 책임을 가지는 추상클래스

```java 
public class ApiKeyAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    public ApiKeyAuthenticationFilter() {
        super("/api/**"); // 인증을 수행할 경로 지정
    }

	// HTTP요청에서 Authentication을 생성한다. 
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String apiKey = request.getHeader("X-Api-Key");

        // 여기에서 apiKey를 검증하고 UserDetails를 생성하는 작업 수행

        // 생성된 UserDetails를 사용하여 Authentication 객체를 생성
        Authentication authentication = new ApiKeyAuthentication(apiKey);

        // SecurityContextHolder에 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }
	
	// 인증 성공 시 수행할 작업
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        
        chain.doFilter(request, response);
    }
}
```

# 참고 
[https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/AbstractAuthenticationProcessingFilter.html]

# 이벤트 발행 
인증에 성공하면 InteractiveAuthenticationSuccessEvent를 발생시킨다.
