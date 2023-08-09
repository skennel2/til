# 다이나믹 프록시

스프링의 빈 생성의 근간이 되는 API이다.
spring-data-jpa, mybatis-spring의 repository 인터페이스도 이를 근간으로 한다.

```java
    // Proxy의 대상이 될 인터페이스
    interface ValueProvider {
        String getValue();
    }
```

```java
    import java.lang.reflect.Proxy;

    // 프록시 객체에 대한 메소드 요청이 있을때마다 아래 람다가 실행되어 처리한다. 
    InvocationHandler invoker = (proxy, method, arguments) -> {
        if (method.getName().equals("getValue")) {
            return "Hello";
        }
        
        throw new RuntimeException();
    };
    
    // ValueProvider 인터페이스의 구현체를 프록시로 생성한다.
    ValueProvider proxy = (ValueProvider)Proxy.newProxyInstance(
            ValueProvider.class.getClassLoader(), 
            new Class[] {ValueProvider.class}, 
            invoker
        );
    
    proxy.getValue() // Hello
```