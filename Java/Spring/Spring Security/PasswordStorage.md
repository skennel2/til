# DelegatingPasswordEncoder
패스워드 암호화에 대한 레거시가 존재하고 앞으로 패스워드 암호화의 베스트 프렉티스가 변할수 있기 때문에

DelegatingPasswordEncoder를 제공한다.

여러개의 PasswordEncoder담고 있고 아래에서 설명할 Id값으로 실제 PasswordEncoder를 찾아내 처리를 위임하는 역할을 한다.

```java 
PasswordEncoder passwordEncoder =
    PasswordEncoderFactories.createDelegatingPasswordEncoder();
```

# Password Storage Format
패스워드가 저장되는 포맷은 다음과 같다. 
```
{id}encodedPassword
```

여기서 id값으로  DelegatingPasswordEncoder를 통해 실제 PasswordEncoder를 lookup한다.

* 예시
```
{bcrypt} -> BCryptPasswordEncoder
{noop} -> NoOpPasswordEncoder
{pbkdf2} -> Pbkdf2PasswordEncoder
```

? 이렇게 알고리즘을 데이터에 명세하는것이 보안상 크게 문제가 되지는 않는다고 한다.

[reference](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html)
