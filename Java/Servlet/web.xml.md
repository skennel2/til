# web.xml
1. DD (Deployment Descriptor : 배포 설명자) 라고 한다.
1. 모든 서블릿 웹 어플리케이션은 WEB-INF/web.xml 파일을 가져야한다.
1. web.xml의 설정들은 어플리케이션 시작시 메모리에 로딩된다. 
1. 애플리케이션에 요청이 수신되었을때 요청에 해당하는 URL을 처리해야하는 클래스를 명시한다. 
1. 주요 설정 정보
    1. 서블릿 매핑
    1. 필터 
    1. 리스너 
    1. 초기화 매개변수 
    1. 오류페이지 
    1. 보안 설정
1. 일반적인 스프링 설정에서 오는것
    1. DispatcherServlet 서블릿 매핑
    1. ContextLoaderListener

## ContextLoaderListener 설정
```xml
 <listener>
     <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
 </listener>
 <context-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>
         /WEB-INF/config/application-context.xml
     </param-value>
 </context-param>
```
1. org.springframework.web.context.ContextLoaderListener
1. 보통 서블릿 웹 어플리케이션의 web.xml에 설정된다.
1. 어플리케이션이 시작될때 RootApplicationContext을 생성하는 클래스이다.

## ContextLoader
1. org.springframework.web.context.ContextLoader
1. web.xml의 listener.listener-class로 ContextLoaderListener를 일반적으로 등록하는데 이 클래스의 부모 클래스이다.
    1. 이렇게 계층을 분리한 이유는?
    1. ServletContextListener interface 
        1. public void contextInitialized(ServletContextEvent sce);
1. **루트 어플리케이션 컨텍스트**의 실질적인 초기화 작업을 담당한다.
    1. 루트 어플리케이션 컨택스트란 
        1. 범위: 애플리케이션 전체에 걸쳐 존재하며, 애플리케이션의 모든 컴포넌트가 접근할 수 있다.
        1. 역할: 애플리케이션의 핵심 비즈니스 로직, 서비스, 데이터베이스 접근 등의 빈(Bean)을 관리
        1. 구성: applicationContext.xml 같은 설정 파일을 통해 구성
1. contextClass
    1. web.xml의 context-param.contextClass 파라미터를 찾아 컨텍스트 클래스 타입을 찾는다.
        1. 찾을 수 없으면 XmlWebApplicationContext로 대체한다.
    1. 기본 ContextLoader 구현을 사용할 경우, contextClass는 ConfigurableWebApplicationContext 인터페이스를 구현해야 한다.
1. contextConfigLocation
1. "contextConfigLocation"이라는 context-param을 처리하여 해당 값을 컨텍스트 인스턴스에 전달한다. 
    1. 이를 여러 파일 경로로 구문 분석할 수 있으며, 콤마와 공백으로 구분할 수 있다. 
        1. ex) "WEB-INF/applicationContext1.xml, WEB-INF/applicationContext2.xml"

## web.xml 예시

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://java.sun.com/xml/ns/javaee https://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
 
 <!-- Dispatcher Servlet 생성 -->
 <servlet>
     <servlet-name>myDispatcherServlet</servlet-name>
     <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
     <init-param>
         <param-name>contextConfigLocation</param-name>
         <param-value>classpath:/config/servlet-config.xml</param-value>
     </init-param>
     
     <load-on-startup>1</load-on-startup>
 </servlet>
 <servlet-mapping>
     <servlet-name>myDispatcherServlet</servlet-name>
     <url-pattern>/</url-pattern>
 </servlet-mapping>
 
 <!-- web application context -->
 <listener>
     <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
 </listener>
 <context-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>
         /WEB-INF/config/application-context.xml
     </param-value>
 </context-param>
 
 <!-- Encoding Filter 생성 -->
 <filter>
     <filter-name>encodingFilter</filter-name>
     <filter-class>
         org.springframework.web.filter.CharacterEncodingFilter
     </filter-class>
     <init-param>
         <param-name>encoding</param-name>
         <param-value>UTF-8</param-value>
     </init-param>
     <init-param>
         <param-name>forceEncoding</param-name>
         <param-value>true</param-value>
     </init-param>
 </filter>
 <filter-mapping>
     <filter-name>encodingFilter</filter-name>
     <url-pattern>/*</url-pattern>
 </filter-mapping>
</web-app>
```