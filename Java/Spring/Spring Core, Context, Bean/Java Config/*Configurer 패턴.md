# Configurer 패턴
사용자 정의 구성을 명시적이고 유연하게 확장 가능하도록 해주는 구조
@EnableWebMvc를 기준으로 하면 @EnableWebMvc 기본구성외에 커스텀이 필요하면 WebMvcConfigurer 사용한다.

 @EnableWebMvc의 기능을 사용자 필요에 따라 확장하는것과 같다.
```java
@Configuration
public class MyMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyHandlerInterceptor());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
```

# 왜 Configurer를 쓸까?
설정 확장성: 필요한 것만 오버라이드
유연함: DI, Bean 접근이 자유로움
낮은 결합도: 핵심 설정은 Spring이 하고, 사용자 설정은 분리
공식 Hook 제공: Spring 내부 설정과의 충돌을 방지하고 의도된 확장만 가능