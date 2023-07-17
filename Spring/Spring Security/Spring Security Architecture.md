# Spring Security Architecture

## 인증과 권한 (Authentication and Access Control)

### 인증
인증의 중심 인터페이스 AuthenticationManager
```java
public interface AuthenticationManager {

  Authentication authenticate(Authentication authentication)
    throws AuthenticationException;
}
```

```
AuthenticationManager - ProviderManager
AuthenticationProvider

ProviderManager has AuthenticationProvider list
```

## 권한 
AccessDecisionManager

## Web Security 필터 

스프링 시큐리티는 서블릿 필터 계층에 존재한다. 
  
필터는 리퀘스트를 자체적으로 처리하길 원한다면 남아있는 필터체인의 필터를 무시할수 있다  
필터는 리퀘스트와 리스폰스를 수정할수 있는 권한을 가지고 있으며 수정된 리퀘스트와 리스폰스는 다른 필터와 서블릿에게 전달된다.  
  
필터의 순서는 매우 중요하다.
필터의 순서를 지정하는 방법은 2가지가 있는데 
첫번째는 필터가 빈으로 괸리될경우 @Order 나 Ordered 인터페이스를 구현할수있고 
두번째는 필터를 FilterRegistrationBean로 만들어 빈으로 등록하는것이다.

스프링 시큐리티는 체인의 하나의 필터에 설치된다.
이 필터는 FilterChainProxy 타입이다.
이것은 빈으로 관리되면 모든 요청에 적용되도록 기본적으로 설정된다. 
이 필터의 순서는 SecurityProperties.DEFAULT_FILTER_ORDER 옵션으로 결정된다. 
물리적인 필터는 하나이지만 이안에는 스프링시큐리티의 여러필터를 담고있는 형태이다.

```
package org.springframework.security.web;

Filter - GenericFilterBean - FilterChainProxy

FilterChainProxy has SecurityFilterChain list
```

# 스프링 시큐리티는 물리적으로 하나의 필터만 가지고 있다. ???
사실 시큐리티는 하나의 필터만 가지는 것은 아니다
DelegatingFilterProxy라는 필터를 하나더 가지고 있다.
DelegatingFilterProxy는 빈으로 관리되지 않고 컨테이너안에 존재한다.

하지만 FilterChainProxy는 언제나 빈으로 관리된다.
얘는 springSecurityFilterChain 



```
DelegatingFilterProxy
package org.springframework.web.filter;

Filter - GenericFilterBean - DelegatingFilterProxy
```



## 
필터가 커스텀되지 않은 바닐라 스프링부트앱에는 기본적인 필터가 설정되어있다.
그중 첫번째 체인은 정적리소스패턴을 무시하기 위해 존재한다,
마지막 체인은 /** 모든 경로에 대한 필터이다.

부트앱에서 모든 시큐리티 필터가 컨테이너에게 알려지지 않는다는 사실은 중요하다.
@Bean 타압의 모든 Filter 구현체는 자동으로 컨테이너에게 등록된다.
시큐리티 체인에 커스텀한 

# 
![2021_04_user_count](~@source/../img.png)

## 참고
[공식문서](https://spring.io/guides/topicals/spring-security-architecture/)
[스프링 부트에 필터를 '조심해서' 사용하는 두 가지 방법](https://taetaetae.github.io/2020/04/06/spring-boot-filter/#%EB%B0%A9%EB%B2%95-1--filterregistrationbean)
[스프링 시큐리티 기본 API및 Filter 이해](https://catsbi.oopy.io/c0a4f395-24b2-44e5-8eeb-275d19e2a536)