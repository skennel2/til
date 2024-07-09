# DispatcherServlet
1. 스프링 MVC의 프론트 컨트롤러
1. web.xml에 어떤 DispatcherServlet가 어떤 url의 요청을 처리할지 기술한다. 
1. 스프링 컨텍스트에 등록되는 빈은 아니다.
    1. 하지만 기본적으로 가지고 있는 전략들은 주입받을수 있는 방법이 마련되어있다.
1. HTTP 요청을 먼저 받아 공통적인 처리를 하고 처리가능한 스프링 컨트롤러로 요청을 위임한다.
1. 주요 HTTP요청 처리로직은 FrameworkServlet.processRequest -> doService - doDispatch 메소드에서 이루어진다.  

# Http 요청 처리과정 (3.1.2)
1. 서블릿 컨테이너가 HTTP요청을 받는다. 
1. HTTP요청이 DispatcherServlet에게 할당된 것이라면 전달받는다.
    1. web.xml의 servlet-mapping.url-pattern에 전달되어야하는 url이 정의되어있다.
1. DispatcherServlet은 모든 요청에 대해 공통적으로 처리해하는 전처리작업이 등록된것이 있다면 수행한다.
    1. 이를테면 보안, 파라미터 조작, 한글 디코딩등
1. 핸들러 매핑 - 컨트롤러로 Http요청 위임 
    1. URL, 파라미터 정보, HTTP명령등을 참고해 어떤 컨트롤러에게 작업을 위임할지 결정한다.
    1. 컨트롤러를 선정하는 전략도 주입 가능하다.
    1. 즉 컨트롤러와 핸들러는 거의 동일한 의미이다.
1. 핸들러 어뎁터 - 위임받은 컨트롤러 오브젝트의 메소드를 호출해 실제 작업을 처리한다. 
    1. 실제 컨트롤러의 메소드를 호출하려면 DispatcherServlet이 컨트롤러의 타입을 알고 있어야 호출할 수 있을것이다.
    1. 컨트롤러가 되기 위한 아무런 제약이나 선결 조건이 없다. (상속등)
    1. 제각기 다른 컨트롤러의 메소드를 일정한 방식으로 다룰수 있게 오브젝트 어뎁터 패턴을 사용한다.
1. 컨트롤러의 모델생성과 정보등록

---
# DispatcherServlet 확장 포인트 
1. HandlerExceptionResolver
1. ViewResolver
1. LocaleResolver
1. ThemeResolver
1. RequestToViewNameTranslator


---

# 핸들러 매핑
1. 핸들러 매핑은 DispatcherServlet이 어떤 컨트롤러에게 작업을 위임할지 결정하는 작업을 말한다.
1. HandlerMapping을 중심 인터페이스로 사용한다. 
1. HandlerMapping은 DispatcherServlet에서 리스트로 가지고 있다.
1. 핸들러 매핑을 찾는 로직은 getHandler 메소드에서 이루어진다.
1. 프레임워크에 디폴트로 포함되는 항목
    1. BeanNameUrlHandlerMapping
    1. SimpleUrlHandlerMapping
    1. DefaultAnnotationHandlerMapping(*) 
        1. Deprecated -> RequestMappingHandlerMapping

```java
/** List of HandlerMappings used by this servlet */
private List<HandlerMapping> handlerMappings;
```

# 핸들러 어뎁터
1. 핸들러 어뎁터는 실제 컨트롤러의 어떤 메소드를 호출해서 결과를 받을지에 대한 전략이다.
1. HandlerAdapter는 DispatcherServlet에서 리스트로 가지고 있다.
1. 실제 비지니스 로직을 담은 핸들러를 호출한다. 
1. 실제 비지니스로직에 필요한 인자처리, 리턴값 처리등을 담당한다.
1. 프레임워크에 디폴트로 포함되는 항목
    1. HttpRequestHandlerAdapter
    1. SimpleControllerHandlerAdapter
    1. AnnotationMethodHandlerAdapter (*)
        1. AnnotationMethodHandlerAdapter는 depracated 대체되는 클래스는  RequestMappingHandlerAdapter

```java 
/** List of HandlerAdapters used by this servlet */
private List<HandlerAdapter> handlerAdapters;
```

---

# 핸들러 매핑 - HandlerMapping
1. 핸들러 매핑의 중심 인터페이스
1. HTTP요청과 핸들러 객체간의 매핑을 정의
1. 매핑된 객체는 HandlerExecutionChain 객체로 래핑되어야한다. 

```java
HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception; 
```

# 핸들러 매핑 - AbstractUrlHandlerMapping 
1. HandlerMapping implementations

---

# 핸들러 어뎁터 - HandlerAdapter
1. 핸들러 어뎁터 중심 인터페이스

```java
ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception;
```

# 핸들러 어뎁터 - AnnotationMethodHandlerAdapter
1. HandlerAdapter implementations
1. HttpRequestHandler 타입의 핸들러를 처리
1. handle 처리는 HttpRequestHandler에게 위임

# WebApplicationContext
```java
/** WebApplicationContext for this servlet */
private WebApplicationContext webApplicationContext;
```