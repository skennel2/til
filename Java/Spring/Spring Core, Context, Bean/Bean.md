
# org.springframework.context

## ApplicationListener interface
1. org.springframework.context
1. 구현 객체가 Spring 애플리케이션에서 발생하는 다양한 이벤트에 반응할 수 있게한다.
1. AbstractApplicationContext.addApplicationListener 로 등록하거나 구현객체를 빈으로 등록하면 동작한다.
1. @EventListener라는 어노테이션도 있으니 check
1. 주요 메소드 
    1. void onApplicationEvent(E event)
1. 내장 이벤트 클래스
    1. ContextRefreshedEvent 
    1. ContextStartedEvent
    1. ContextStoppedEvent
    1. ContextClosedEvent
    1. ApplicationReadyEvent

---     

# org.springframework.beans.factory 

## FactoryBean interface
1. org.springframework.beans.factory 
1. 특정 빈 객체를 생성하는 방법을 캡슐화한다.
1. FactoryBean을 구현한 클래스는 getObject() 메서드를 통해 생성된 객체가 Spring 컨테이너에 빈으로 등록
1. FactoryBean은 필요한 시점까지 객체의 생성을 지연할 수 있습니다. 이는 특히 비용이 큰 객체나 외부 리소스와의 연결을 요구하는 객체를 다룰 때 유용
1. 주요메소드
    1. getObject()
    1. getObjectType()
    1. isSingleton()

## InitializingBean interface
1. org.springframework.beans.factory
1. 빈 클래스에 붙을수 있는 인터페이스이다. 
1. 빈이 생성되고 모든 프로퍼티가 설정된 후, 초기화 로직을 정의할 수 있게 하는 인터페이스
1. 대체방법 - 빈 클래스에 스프링에 대한 의존이 생기기 때문에 아래 대체 방법을 고려하라
    1. @PostConstruct 
    1. xml <bean> 태그의 init-method 속성을 사용하여 초기화 메서드를 지정할 수 있다.
1. 주요메소드
    1. afterPropertiesSet()

## DisposableBean interface
1. org.springframework.beans.factory
1. 빈 클래스에 붙을수 있는 인터페이스이다. 
1. 빈의 생명주기에서 빈이 소멸될 때 필요한 정리(cleanup) 작업을 정의할 수 있게 해주는 인터페이스
1. 대체방법 - 빈 클래스에 스프링에 대한 의존이 생기기 때문에 아래 대체 방법을 고려하라
    1. @PreDestroy
    1. xml <bean> 태그의 destroy-method 속성을 사용하여 초기화 메서드를 지정할 수 있다.
1. 주요메소드
    1. destroy()

