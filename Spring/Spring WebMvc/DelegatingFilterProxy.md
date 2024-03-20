
Spring은 DelegatingFilterProxy라는 Filter 구현체를 제공합니다. 
이를 통해 Servlet 컨테이너의 라이프사이클과 Spring의 ApplicationContext 간의 연결을 가능하게 합니다. 
Servlet 컨테이너는 자체 표준을 사용하여 Filter 인스턴스를 등록할 수 있지만 Spring에서 정의한 Bean들을 알지 못합니다. 
DelegatingFilterProxy를 통해 표준 Servlet 컨테이너 메커니즘을 사용하여 등록할 수 있지만 모든 작업을 Filter를 구현한 Spring Bean에 위임할 수 있습니다.