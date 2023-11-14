# 빈 후처리기 BeanPostProcessor 
빈 팩토리의 hook중 하나이다
빈등록을 하기 전에 빈을 커스텀할수 있게한다.

```java
public interface BeanPostProcessor {
    // 빈 생성 이전에 실행되는 메소드
    Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;
    // 빈 생성 이후에 실행되는 메소드
    Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;
}
```
