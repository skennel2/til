

1. org.springframework.web.context 패키지
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
