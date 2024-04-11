# DispatcherServlet
1. 스프링 MVC의 프론트 컨트롤러
1. web.xml에 DispatcherServlet과 url매핑 정보를 정의한다.
1. HTTP 요청을 먼저 받아 공통적인 처리를 하고 처리가능한 스프링 컨트롤러로 요청을 위임한다.
1. 주요 HTTP요청 처리로직은 FrameworkServlet.processRequest -> doService - doDispatch 메소드에서 이루어진다.  

# WebApplicationContext
```java
/** WebApplicationContext for this servlet */
private WebApplicationContext webApplicationContext;
```

# 핸들러 매핑
1. 핸들러 매핑은 DispatcherServlet이 어떤 컨트롤러에게 작업을 위임할지 결정하는 작업을 말한다.
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

--- 

# 핸들러 어뎁터
1. HandlerAdapter는 DispatcherServlet에서 리스트로 가지고 있다.
1. 실제 비지니스 로직을 담은 핸들러를 호출한다. 
1. 실제 비지니스로직에 필요한 인자처리, 리턴값 처리등을 담당한다.
1. 프레임워크에 디폴트로 포함되는 항목
    1. HttpRequestHandlerAdapter
    1. SimpleControllerHandlerAdapter
    1. AnnotationMethodHandlerAdapter (*)
        1. depracated - RequestMappingHandlerAdapter

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