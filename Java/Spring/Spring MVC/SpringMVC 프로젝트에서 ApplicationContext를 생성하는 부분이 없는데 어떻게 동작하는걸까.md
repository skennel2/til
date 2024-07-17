
# spring webmvc 프로젝트에서 ApplicationContext를 생성하는 부분이 없는데 어떻게 동작하는걸까?

1. Spring MVC 프로젝트에서는 일반적으로 서블릿 컨테이너가 애플리케이션 컨텍스트를 관리하고 초기화한다.
1. Spring MVC 애플리케이션은 보통 DispatcherServlet이라는 중앙 서블릿을 사용하여 요청을 처리한다. 
이 DispatcherServlet은 서블릿 컨테이너에 의해 관리되며, 자체적으로 애플리케이션 컨텍스트를 생성하고 초기화합니다.

* Spring MVC 의 구조
1. 서블릿 컨테이너 (예: Tomcat): Spring MVC 애플리케이션은 서블릿 컨테이너 내에서 실행된다.
1. DispatcherServlet: Spring MVC 애플리케이션은 주로 DispatcherServlet을 사용하여 클라이언트 요청을 처리한다.  
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
        // Create the 'root' Spring application context
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        // rootContext.register(AppConfig.class);
        rootContext.scan("com.example");
        // Manage the lifecycle of the root application context
        servletContext.addListener(new ContextLoaderListener(rootContext));

        // Create the dispatcher servlet's Spring application context
        AnnotationConfigWebApplicationContext dispatcherContext = new AnnotationConfigWebApplicationContext();
        // dispatcherContext.register(WebMvcConfig.class);

        // Register and map the dispatcher servlet
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(dispatcherContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }
}

```