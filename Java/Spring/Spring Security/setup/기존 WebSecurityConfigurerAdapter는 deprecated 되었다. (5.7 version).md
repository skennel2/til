## 기존 스프링 시큐리티 설정정보를 넣던 WebSecurityConfigurerAdapter는 deprecated 되었다. (5.7 version)

deprecated 된것은 아래의 이유라고 하는데 
```
In Spring Security 5.7.0-M2 we deprecated the WebSecurityConfigurerAdapter, as we encourage users to move towards a component-based security configuration.
```
component-based security라는건 어떤 개념일까
복잡하게 extends와 오버라이드로 설정하는것이 아닌 빈등록을 기반으로 설정하는것을 말하는것같다.  
 
이때 보안설정의 핵심적인 빈은 SecurityFilterChain 인걸로 보인다.

[공식문서](https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter)


## SecurityFilterChain 빈생성으로 설정하는 HttpSecurity
```java
@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());
        return http.build();
    }

}
```