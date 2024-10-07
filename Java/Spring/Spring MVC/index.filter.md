# 서블릿 필터

스프링 MVC는 서블릿 스펙에 의존한다. 이 서블릿 스펙중에는 필터 라는것이 존재한다.
이 서블릿 필터는 클라이언트 요청을 가로채서 사전 처리를 수행하는 데 사용된다. 
또한, 웹 애플리케이션에서 응답을 가로채어 클라이언트에게 보내기 전에 후처리를 수행할 수도 있다.
이름 대로 요청에서 무엇인가를 필터링 하는 데만 이용되지 않고 더 넓게 요청과 응답에 대한 전처리, 후처리에 사용된다고 볼수 있다.

아래는 실제 사용되는 예시이다.
1. 인증 및 권한 부여 
1. 로깅 및 모니터링 (Logging & Monitoring)
1. 응답 데이터 압축
1. 캐싱
1. 글로벌 예외 처리

## 서블릿 필터 예시코드 

아래는 커스텀 필터의 예시이다.

```java
import javax.servlet.*;
import java.io.IOException;

public class MyFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 필터 초기화
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // 요청 전 처리
        System.out.println("Before request processing");

        chain.doFilter(request, response);

        // 응답 후 처리
        System.out.println("After response processing");
    }

    @Override
    public void destroy() {
        // 필터 종료 시 처리
    }
}
```

## 서블릿 필터 등록
이 필터를 등록하기 위해서는 web.xml나 WebFilter 어노테이션을 이용한다. 
web.xml을 이용할 경우 Filter를 구현한 클래스와 해당 필터가 처리할 URL패턴 정도를 지정한다.

```xml
<filter>
    <filter-name>MyFilter</filter-name>
    <filter-class>com.example.MyFilter</filter-class>
</filter>

<filter-mapping>
    <filter-name>MyFilter</filter-name>
    <url-pattern>/*</url-pattern> <!-- 필터가 적용될 경로 -->
</filter-mapping>
```

# 서블릿 필터 라이프사이클 
서블릿 필터는 초기화, 필터, 종료 4단계를 가진다.

1. 초기화 (init 메소드): 초기화는 필터가 처음 생성될때 실행된다. 서블릿 컨텍스트는 어플리케이션이 시작될때 필터를 인스턴스화 하고 init메소드를 호출해 초기화 작업을 수행한다.
1. 필터 (doFilter 메소드)
1. 종료 (detroy 메소드): 어플리케이션이 종료될때 호출된다.
