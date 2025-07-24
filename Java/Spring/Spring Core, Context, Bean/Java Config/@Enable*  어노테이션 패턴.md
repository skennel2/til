# @Enable*  
@Enable* 어노테이션들은 Spring에서 어떤 기능을 명시적으로 “활성화”하기 위해 사용하는 메타 어노테이션패턴.
문법적인 요소는 아니고 관례라고 볼수있다.
내부에논 @Import() 를 사용하는 구조가 대부분이다.
이 @Import를 @Configuration에 붙여도 동일하게 동작하지만 재사용 가능하게하고 이름으로 의미를 설명하기위해 이 관례를 따른다.

EnableScheduling의 실제 내부
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import(SchedulingConfiguration.class)
public @interface EnableScheduling {
}
```

# 예시
| 어노테이션                            | 기능                                 |
| -------------------------------- | ---------------------------------- |
| `@EnableScheduling`              | `@Scheduled` 메서드 실행 가능하게 함         |
| `@EnableAsync`                   | `@Async` 비동기 실행 지원                 |
| `@EnableWebMvc`                  | Spring MVC 구성 활성화                  |
| `@EnableJpaRepositories`         | JPA 리포지토리 자동 등록                    |
| `@EnableConfigurationProperties` | `@ConfigurationProperties` 클래스 바인딩 |
| `@EnableTransactionManagement`   | 트랜잭션 기능 사용 가능하게 함                  |

