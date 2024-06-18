# @Bean
* 빈을 생성하는 메소드에 대한 정의
* name 속성이 제공되지만, 기본적략은 @Bean 메소드의 이름을 사용하는것 
* name 속성은 명시적인 이름을 지정할 필요가 있을때 사용할수 있다. 배열도 허용하는것에 유의
```java
     @Bean({"b1", "b2"}) // bean available as 'b1' and 'b2', but not 'myBean'
     public MyBean myBean() {
         // instantiate and configure MyBean obj
         return obj;
     }
```
* 일반적으로 @Configuration 클래스 내에 메소드에 사용된다. 

# Bean lite 모드
@Bean 이 @Configuration이 아닌 @Component 유형의 클래스내에 정의될수도 있다.
???

```java
 @Component
 public class Calculator {
     public int sum(int a, int b) {
         return a+b;
     }

     @Bean
     public MyBean myBean() {
         return new MyBean();
     }
 }
```

# Profile, Scope, Lazy, DependsOn, Primary, Order
```java
     @Bean
     @Profile("production")
     @Scope("prototype")
     public MyBean myBean() {
         // instantiate and configure MyBean obj
         return obj;
     }
```

* @Profile
* @Scope은 빈의 스코프를 싱글톤에서 다른것으로 바꿀 필요가있을때 사용한다.
* @Lazy 싱글톤 스코프에서만 사용될수있다. ...
* @Order는 List<> 형태로 빈을 주입받을때 Bean의 우선순위가 필요할때 사용한다. 작을 수록 작은 인덱스로 정렬된다. 이때 N개의 빈들중 일부만 @Order를 사용하면 나머지는 임의의 순서가 적용된다.

