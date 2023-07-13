# 스프링시큐리티 필터 추가 예시

```java
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.addFilter(...)
		return http.build();
	}
```

필터로 추가될수 있는 것은 시큐리티 프레임워크 내의 필터거나 그를 확장한 형태여야한다. 

# Filter Chain 확인하는 방법
```
@EnableWebSecurity(debug = true)
```

# 참고
[https://gngsn.tistory.com/160]