# 권한의 핵심 인터페이스 GrantedAuthority

GrantedAuthority 권한의 종류를 표현. 
``` java
interface GrantedAuthority {
    String getAuthority();
}
```
Spring Security는 이를 가장 간단하게 구현한 SimpleGrantedAuthority구현체를 제공한다.
디폴트 동작으로 ROLE기반 권한체계에서 ROLE_이라는 접두사가 추가된다.
USER 라는 권한을 찾으면 getAuthority의 결과로 ROLE_USER라는 값이 리턴되는 것을 찾는다. 
이를 커스터마이징하고 싶으면 GrantedAuthorityDefaults를 찾아보면된다.

# 권한의 핵심 인터페이스 AuthorizationManager  
AuthorizationManager 실제 권한제어를 수행한다. 
AccessDecisionManager와 AccessDecisionVoter를 대체한다

```java
public interface AuthorizationManager<T> {
	void verify(Supplier<Authentication> authentication, T object);

	AuthorizationDecision check(Supplier<Authentication> authentication, T object);
}
```
check메소드에 권한결정에 필요한 모든 정보를 인자로 넘겨 이를 바탕으로 AuthorizationDecision를 리턴한다. 

verify에서 check를 호출하고 AuthorizationDecision 결과에 따라 AccessDeniedException를 던진다. (default)

# AuthorizationFilter
mvc 환경에서 실제 권한체크가 이루어지는 필터인듯하다.

얘가 메인으로 가지고 있는 AuthorizationManager는 RequestMatcherDelegatingAuthorizationManager이다 (현 테스트 환경에서)


# 참고
[권한 부여(Authorization) 처리 흐름](https://velog.io/@bimilless/Spring-Security%EC%9D%98-%EA%B6%8C%ED%95%9C-%EB%B6%80%EC%97%AC-%EC%B2%98%EB%A6%AC-%ED%9D%90%EB%A6%84)