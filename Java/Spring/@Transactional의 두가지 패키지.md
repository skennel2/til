# @Transactional은 일반적으로 두가지 패키지가 존재 
javax.transaction.Transactional 
org.springframework.transaction.annotation.Transactional

javax는 java ee에 귀속된 어노테이션이고 
springframework버전은 스프링에 귀속된 어노테이션이지만
javax.transaction.Transactional도 지원하기 시작

springframework 버전에 더 많은 옵션이 존재

# Spring이 javax.transaction.Transactional를 처리하는 방법 
Spring이 두 어노테이션을 처리하는 방식이 완전동일하지는 않은거같음
-> 다시 4이상 버전에서는 거의 동일한거같음....

[https://docs.spring.io/spring-framework/docs/4.2.0.RELEASE/spring-framework-reference/html/transaction.html#transaction-declarative-annotations]
