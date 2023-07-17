#  boot app run 시 [... has been compiled by a more recent version] 에러 

프로젝트 jdk와 스프링 버전차이로 생기는 문제인거같다.


Spring - JDK 간 버전 호환
Spring Framework 5.3.x with JDK 8 - 19 (expected)
Spring Framework 5.2.x with JDK 8 - 15
Spring Framework 5.1.x with JDK 8 - 12
Spring Framework 5.0.x with JDK 8 - 10
Spring Framework 4.3.x with JDK 6 -  8 (its official EOL(end-of-life))
 
Spring Boot - JDK 간 버전 호환
Spring Boot 2.3↑ with Java 9 and above
Spring Boot 2.1↓ with Java 8 - 11

#  콘솔에 아래 위치로부터 짧은 주기로 DEBUG 레벨 로그가 찍히는 현상 
```cmd
[org.apache.tomcat.util.net.NioEndpoint]
```

해결 application.properties 로그 레벨 조정
```
logging.level.org.apache.tomcat=ERROR 
logging.level.org.apache.tomcat.util.net=ERROR
```

# hasRole not working 
기본적으로 생성되는 ROLE에는 prefix가 붙는다.  (기본 ROLE_)

not working case
```
        .antMatchers("/test/user").hasRole("USER")

		List<SimpleGrantedAuthority> auth = Arrays.asList(new SimpleGrantedAuthority("ADMIN"));
		CutomUserDetail user1 = new CutomUserDetail(1L, "test", "a1234", auth);
		this.repository.add(user1);
```

working case
```
        .antMatchers("/test/user").hasRole("USER")

		List<SimpleGrantedAuthority> auth = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
		CutomUserDetail user1 = new CutomUserDetail(1L, "test", "a1234", auth);
		this.repository.add(user1);
```