# 서블릿 필터

스프링 MVC는 서블릿 스펙에 의존한다. 이 서블릿 스펙중에는 필터 라는것이 존재한다.
이 서블릿 필터는 클라이언트 요청을 가로채서 사전 처리를 수행하는 데 사용된다. 
또한, 웹 애플리케이션에서 응답을 가로채어 클라이언트에게 보내기 전에 후처리를 수행할 수도 있다.
요청과 응답에 대한 전처리, 후처리에 사용된다고 볼수 있고 이러한 처리를 필터링이라고 한다.

아래는 실제 사용되는 예시이다.
1. 인증 및 권한 부여 
1. 로깅 및 모니터링 (Logging & Monitoring)
1. 응답 데이터 압축
1. 캐싱
1. 글로벌 예외 처리

## 서블릿 필터 예시코드 

서블릿 필터는 초기화, 필터, 종료 4단계를 가진다.

1. 초기화 (init 메소드): 초기화는 필터가 처음 생성될때 실행된다. 서블릿 컨텍스트는 어플리케이션이 시작될때 필터를 인스턴스화 하고 init메소드를 호출해 초기화 작업을 수행한다.
1. 필터 (doFilter 메소드)
1. 종료 (detroy 메소드): 필터에 서비스 중단을 알리기 위해 웹 컨테이너에서 호출된다.

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

## 스프링 부트의 필터등록 
스프링 부트의 경우 Filter 구현체를 빈으로 등록하면 자동으로 서블릿필터로 동작한다.

1. 빈 스캔 및 등록: @Component로 등록된 필터가 Spring 컨텍스트에 빈으로 등록
1. 필터 자동 탐색: Spring Boot의 자동 구성 메커니즘이 Filter 인터페이스를 구현한 빈을 자동으로 탐색 
1. 서블릿 컨텍스트에 필터 등록: Spring Boot는 ServletContextInitializer를 통해 필터를 서블릿 컨텍스트에 등록하며, 이를 addFilter() 메서드를 통해 서블릿 컨테이너에 추가
1. 요청 처리 시 필터 적용: 등록된 필터는 서블릿 컨테이너에 의해 모든 요청에 대해 적용되며, Spring MVC의 DispatcherServlet 이전에 요청을 가로채거나 후처리하는 역할을 한다.
---

# 스프링의 필터 클래스

## GenericFilterBean
1. org.springframework.web.filter

javax.servlet.Filter의 기본적인 abstract 구현이다. Spring의 Environment등에 접근할수 있게 구현되어있다.

## OncePerRequestFilter
1. org.springframework.web.filter
1. abstract class OncePerRequestFilter extends GenericFilterBean
1. 주요 필터링 로직은 abstract doFilterInternal의 구현이고, 이것이 요청당 한번만 이루어지는 것을 보장한다. 
1. ServletRequest에 마크용 어트리뷰트를 붙여 이미 필터링된것인지를 체크한다.

한 요청에 대해 딱 한 번만 필터링 로직을 적용하기를 원할때 이 클래스를 상속해 구현한다.
필터가 적용된 요청이 포워딩되거나 리다이렉트되는 경우, 필터가 다시 호출될 수 있다.
마크용 어트리뷰트 (플래그)를 사용해 이미 필터링된것이라고 판단되면 자신의 필터링 로직을 실행하지않고 필터체인을 다음 필터로 넘긴다.

## DelegatingFilterProxy
1. package org.springframework.web.filter
1. public class DelegatingFilterProxy extends GenericFilterBean

DelegatingFilterProxy는 Servlet 컨테이너의 라이프사이클과 Spring의 ApplicationContext 간의 연결을 가능하게 한다.
Servlet 컨테이너는 자체 표준을 사용하여 Filter 인스턴스를 등록할 수 있지만 Spring에서 정의한 Bean들을 알지 못한다. 
DelegatingFilterProxy를 통해 표준 Servlet 컨테이너 메커니즘을 사용하여 등록할 수 있지만 모든 작업을 Filter를 구현한 Spring Bean에 위임한다.

그렇기에 DelegatingFilterProxy는 서블릿 필터로 등록되고 대리하는 Filter는 서블릿 필터로 등록되지 않는다.

전통적인 Spring MVC 환경이나 특정 설정에서는 서블릿 컨텍스트가 먼저 초기화되기 때문에 Spring 컨텍스트에서 관리하는 빈을 직접 서블릿 필터로 등록할 수 없다. 
이때 DelegatingFilterProxy는 필터의 초기화를 서블릿 컨텍스트에 맡기면서도, Spring 컨텍스트에서 실제 필터 빈을 위임받아 사용할 수 있다.
DelegatingFilterProxy는 서블릿 컨텍스트와 Spring 컨텍스트가 초기화되는 시점이 달라도 필터가 정상적으로 작동할 수 있도록 설계되어 있다.

스프링 시큐리티의 springSecurityFilterChain가 DelegatingFilterProxy로써 관리된다.