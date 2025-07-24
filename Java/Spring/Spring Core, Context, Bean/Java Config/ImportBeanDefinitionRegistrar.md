# ImportBeanDefinitionRegistrar
동적으로 빈을 등록하고 싶을때 사용한다. @Enable* 어노테이션을 개발하기 위해사용한다.
일반적으로 @Import와 함께 쓰이며 컴포넌트 스캔으로 불가능한 방식으로 빈을 주입할수 있다. 
MyBatis, Spring Data JPA 같은 인터페이스 기반의 자동 리포지토리 등록처럼 유연한 확장이 필요할 때 사용한다.

```java
public interface ImportBeanDefinitionRegistrar {
    void registerBeanDefinitions(
        /**
         * 현재 @Import가 붙은 클래스의 메타데이터를 제공. 어노테이션 정보 등을 읽을 수 있음.
         */
        AnnotationMetadata importingClassMetadata,
        /**
         * 실제로 BeanDefinition을 등록하는 API. 이걸 통해 @Component 없이도 빈을 등록할 수 있음.
         */        
        BeanDefinitionRegistry registry
    );
}
```

# 사용예시
1. 런타임에 조건에 따라 빈을 등록하고 싶을 때	
    예: 특정 환경 설정에 따라 빈을 다르게 구성
1. 스캔 기반이 아닌 직접 정의 방식이 필요할 때	
    예: 외부 라이브러리와 통합 시 유연한 설정이 필요할 때
1. 애노테이션 기반 설정을 확장하고 싶을 때	@Enable... 같은 설정 어노테이션 직접 구현 시

# 예제 
커스텀 Enable 어노테이션 인터페이스
이렇게 코스텀 어노테이션을 만들지않고 @Configuration클래스에 @Import(MyRegistrar.class)를 추가해도 동일하게 동작한다.
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import(MyRegistrar.class)
public @interface EnableMyFeature {
}
```

 ImportBeanDefinitionRegistrar 구현
```java
public class MyRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(
        AnnotationMetadata metadata,
        BeanDefinitionRegistry registry
    ) {
        GenericBeanDefinition beanDef = new GenericBeanDefinition();
        beanDef.setBeanClass(MyService.class);
        beanDef.setLazyInit(false);

        registry.registerBeanDefinition("myService", beanDef);
    }
}
```

```java
@EnableMyFeature
@Configuration
public class AppConfig {
}
```

# 동작구조 
1. @Import(MyRegistrar.class) 선언
2. MyRegistrar 는 ImportBeanDefinitionRegistrar 구현
3. Spring 이 설정 클래스(@Configuration)를 파싱할 때
4. registerBeanDefinitions() 호출
5. 내부에서 registry.registerBeanDefinition() 을 호출해 Bean 등록

# 유사 확장 지점 비교
1. ImportSelector
    클래스 이름 리스트만 반환 (간접적으로 빈 등록)
1. ImportBeanDefinitionRegistrar	
    BeanDefinition 직접 생성 및 등록
1. BeanFactoryPostProcessor	
    1. 모든 BeanDefinition 생성 이후 조작
1. BeanPostProcessor	
    1. 빈 인스턴스 생성 이후 조작

# ImportBeanDefinitionRegistrar, BeanFactoryPostProcessor 사용처 차이 

프레임워크 확장이나 라이브러리 개발 시, 특정 기능을 @Import로 켜면서 동적 빈 등록하려면 ImportBeanDefinitionRegistrar
전역 빈 정의 수정, 프로퍼티 값 조작 등은 BeanFactoryPostProcessor가 적합