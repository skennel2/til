# @Configuration 으로 설정한 설정클래스도 빈으로 등록된다. 
1. 빈으로 자동 등록되는 설정클래스의 빈 네임등의 요소는 기존 @Component 클래스들과 다를것은 없다.
1. 설정 클래스 빈의 @Bean이 붙은 메소드를 호출하면 메소드의 로직대로 인스턴스를 리턴하는것이 아닌 빈을 리턴한다. 

```java
@Configuration
public class MyConfiguration {
    @Bean
    public MyBean myBean() {
        return new MyBean();
    }
}

@Component
public class TestComponent {
    @Autowired 
    MyConfiguration configuration;
    
    public void callMyBean() {
        // 여기서 myBean은 new로 생성된 인스턴스가 아닌 컨텍스트에 등록된 MyBean 타입의 빈이다.
        // 여러번 호출된다고 해도 언제나 같은 인스턴스가 리턴될것이다.
        MyBean myBean = this.configuration.myBean();
    }
}
```