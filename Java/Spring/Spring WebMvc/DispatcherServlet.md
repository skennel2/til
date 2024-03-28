# DispatcherServlet
스프링 MVC의 프론트 컨트롤러
web.xml에 DispatcherServlet과 url매핑 정보를 정의한다.
HTTP 요청을 먼저 받아 공통적인 처리를 하고 처리가능한 스프링 컨트롤러로 요청을 위임한다.

# 핸들러 매핑
핸들러 매핑을 DispatcherServlet이 어떤 컨트롤러에게 작업을 위임할지 결정하는 작업을 말한다.

```java
/** List of HandlerMappings used by this servlet */
private List<HandlerMapping> handlerMappings;
```
