
# 주요 concrete 클래스

## AnnotationConfigApplicationContext
@Configuration 클래스나 @Component, @Inject 어노테이션을 사용하는 클래스를 입력으로 받는다. 
register(Class...)로 클래스를 하나씩 등록하거나
scan(String...)을 사용하여 경로 스캔도 가능하다.
여러 @Configuration클래스가 존재할때 나중에 정의된 @Bean메소드가 이전것을 덮어쓴다.

## GenericWebApplicationContext

## AnnotationConfigWebApplicationContext
WebApplicationContext

---

# 참고 
(Spring - @Autowired는 어떻게 동작하는 걸까?)[https://heowc.dev/2020/07/04/how-does-autowired-work]
