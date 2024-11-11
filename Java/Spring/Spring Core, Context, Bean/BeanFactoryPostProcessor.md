# BeanFactoryPostProcessor 
1. 빈팩토리 후처리기
1. 작동되는 시점은 모든 컴포넌트 스캔후 스캔된 모든 컴포넌트의 빈정의(Bean Definition)가 생성된 시점이다. 
1. ConfigurableListableBeanFactory에 인자로 접근할수 있어 모든 빈 정의에 접근및 변경이 가능해 원하는대로 커스텀할 수 있다.
1. 스프링은 빈팩토리후처리기 작동이 완료된 이후의 빈정의를 가지고 인스턴스화 하게된다.

```java
@Component
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
	@Override
	public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
		for (String beanName : beanFactory.getBeanDefinitionNames()) {
			System.out.println("bean name: " + beanName);
		}
	}
}
```

# 사용처 얘시
1. @Confifuration 어노테이션 처리를 위한 ConfigurationClassPostProcessor
	1. [text](<@Configuration, ConfigurationClassPostProcessor.md>)

# 참고
[https://mangkyu.tistory.com/177]
[https://stackoverflow.com/questions/30455536/beanfactorypostprocessor-and-beanpostprocessor-in-lifecycle-events]