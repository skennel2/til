
# spring webmvc 프로젝트에서 ApplicationContext를 생성하는 부분이 없는데 어떻게 동작하는걸까?

1. Spring MVC 프로젝트에서는 일반적으로 서블릿 컨테이너가 애플리케이션 컨텍스트를 관리하고 초기화한다.
1. Spring MVC 애플리케이션은 보통 DispatcherServlet이라는 중앙 서블릿을 사용하여 요청을 처리한다. 이 DispatcherServlet은 서블릿 컨테이너에 의해 관리되며, 자체적으로 애플리케이션 컨텍스트를 생성하고 초기화합니다.

* Spring MVC 의 구조
1. 서블릿 컨테이너 (예: Tomcat): Spring MVC 애플리케이션은 서블릿 컨테이너 내에서 실행된다.
1. DispatcherServlet: Spring MVC 애플리케이션은 DispatcherServlet을 사용하여 클라이언트 요청을 처리한다.  
1. DispatcherServlet은 서블릿 컨테이너에 의해 관리되며, 자체적으로 애플리케이션 컨텍스트를 생성하고 초기화한다.
1. WebApplicationContext: DispatcherServlet이 내부적으로 사용하는 애플리케이션 컨텍스트는 WebApplicationContext의 구현체
이는 Spring MVC에 특화된 애플리케이션 컨텍스트로, ServletContext와 밀접하게 연관되어 웹 애플리케이션의 라이프사이클에 맞춰 초기화된다.

* 
따라서 Spring MVC 프로젝트에서는 보통 DispatcherServlet이 서블릿 컨테이너에 의해 관리되며, 
이 DispatcherServlet이 자체적으로 애플리케이션 컨텍스트를 생성하고 초기화한다.
개발자는 보통 이 애플리케이션 컨텍스트를 직접 생성할 필요가 없다.

```java
public class App implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        // 루트 콘텍스트를 생성한다. 
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        // 루트 콘텍스트에서 특정 패키지 빈을 스캔
        rootContext.scan("com.example");
        // 루트 콘텍스트 리스너 제공
        servletContext.addListener(new ContextLoaderListener(rootContext));

        // dispatcher의 콘텍스트 생성및 제공
        AnnotationConfigWebApplicationContext dispatcherContext = new AnnotationConfigWebApplicationContext();
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(dispatcherContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }
}

```
