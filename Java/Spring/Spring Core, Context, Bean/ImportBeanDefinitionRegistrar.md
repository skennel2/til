# ImportBeanDefinitionRegistrar
동적으로 빈을 등록하고 싶을때 사용한다.
일반적으로 @Enabled와 함께 쓰이며 컴포넌트 스캔으로 불가능한 방식으로 빈을 주입할수 있다. 

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

# 유사 확장 지점 비교
1. ImportSelector
    클래스 이름 리스트만 반환 (간접적으로 빈 등록)
1. ImportBeanDefinitionRegistrar	
    BeanDefinition 직접 생성 및 등록
1. BeanFactoryPostProcessor	
    1. 모든 BeanDefinition 생성 이후 조작
1. BeanPostProcessor	
    1. 빈 인스턴스 생성 이후 조작