# 예제와 목적 
프로젝트 구성 
spring-boot-starter-data-jpa
spring-boot-starter-security
spring-boot-starter-web

위 구성의 프로젝트를 생성후 바로 boot app을 실행하면 
기본적으로 생성되는 로그인창이 띄어진다. 

여기에 직접 로그인을 시도해 성공하면 특정 페이지로 이동하는것을 구성해보고
그 과정을 분석한다.

#
```java
@Configuration
@EnableWebSecurity
public class MyAppConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
        // UserDetailsService 등록
		http.userDetailsService(this.userDetailService());
        // 기본폼 로그인 사용
		http.formLogin();
	}	
    
    @Bean
	UserDetailsService userDetailService() { ... }
	
    // 빈으로 등록되면 자동으로 사용된다.
    // WHY: 어떻게 자동으로 사용될까?
	@Bean
	PasswordEncoder passwordEncoder() { ... }
}
```

# DaoAuthenticationProvider 
AuthenticationProvider의 구현체중 하나 
UserDetails, UserDetailsService, PasswordEncoder를 가지고 authenticate를 수행한다.

UserDetails Dao를 통해 불러와진다. username, password, 권한정보등을 가지고 있는 Entity 성격의 객체이다. 
UserDetailsService username으로 UserDetails를 불러오는 서비스이다.
PasswordEncoder 패스워드인코더