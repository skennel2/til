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

# web.xml 예시

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
Colored
```