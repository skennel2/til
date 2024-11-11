# @Configuration
* 복수의 @Bean 메소드를 포함하는 클래스로 보통 스프링 컨테이너에게 전달되어 빈정의를 생성하기 위한 설정정보로써 사용된다. 

```java
 AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
 ctx.register(AppConfig.class);
 ctx.refresh();
 MyBean myBean = ctx.getBean(MyBean.class);
```

* @Configuration 클래스는 xml의 <bean>으로도 정의될수있다.
```xml
 <beans>
    <context:annotation-config/>
    <bean class="com.acme.AppConfig"/>
 </beans>
```

# @Configuration 으로 설정한 설정클래스도 빈으로 등록된다. 
1. 빈으로 자동 등록되는 설정클래스의 빈 네임등의 요소는 기존 @Component 클래스들과 다를것은 없다.
1. 설정 클래스 빈의 @Bean이 붙은 메소드를 스프링 컨텍스트안에서 호출하면 메소드의 로직대로 인스턴스를 리턴하는것이 아닌 빈을 리턴한다. 

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
        // 실제 메소드의 로직은 new 키워드를 쓰고 있지만 여러번 호출된다고 해도 언제나 같은 인스턴스가 리턴될것이다.
        MyBean myBean = this.configuration.myBean();
    }
}
```

# 스프링 컨테이너 인프라 빈
* org.springframework.context.annotation.ConfigurationClassPostProcessor

@Configuration 붙은 클래스를 설정클래스로서 동작하게 하는 BeanFactoryPostProcessor  
아래 설정을 사용할 경우 디폴트로 등록되는 빈이다.  
```xml
<context:annotation-config/>  
<context:component-scan/>  
```
(참고로 component-scan 설정시 annotation-config 설정을 모두 포함해서 component-scan 만 존재하면 된다.)