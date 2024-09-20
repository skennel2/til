# 빈 후처리기 interface BeanPostProcessor 
빈 팩토리의 hook중 하나이다
스프링에서 빈의 초기화 전후에 커스터마이징을 할 수 있는 인터페이스

```java
public interface BeanPostProcessor {
    // 빈 생성 이전에 실행되는 메소드
    Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;
    // 빈 생성 이후에 실행되는 메소드
    Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;
}
```

# ConfigurableBeanFactory.addBeanPostProcessor로 BeanPostProcessor를 등록하지 않고 빈으로도 등록가능
AbstractApplicationContext의 refresh 로직중 빈에서 BeanPostProcessor를 찾아 addBeanPostProcessor해주는 부분이 존재

PostProcessorRegistrationDelegate 참고