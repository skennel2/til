# 목적
@ConfigurationProperties로 정의된 클래스를 Spring의 빈으로 등록하고,
외부 설정 값을 해당 클래스의 필드에 자동으로 바인딩되게 한다.

```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private int version;

    // getter, setter
}

```yml
app:
  name: MyService
  version: 1
```

# 빈등록 방법

@EnableConfigurationProperties로 활성화
```java
@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class AppConfig {
}
```
또는 Spring Boot 2.2+에서는 이 방법도 가능:

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private int version;
}
```
이 경우에는 @EnableConfigurationProperties 없이도 동작

# 원리 
1. @EnableConfigurationProperties 등록
2. ConfigurationPropertiesBindingPostProcessor 등록
3. Environment(Binder)를 통해 설정 값 바인딩
4. 해당 클래스를 Bean으로 등록 및 주입