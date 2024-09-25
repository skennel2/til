
서블릿 필터(Servet Filter)가 무엇인지, 그리고 그것이 어떻게 동작하는지 알고 있나요? 이는 서블릿 사양(Servlet Spec)에서 매우 유용한 부분으로, HTTP 요청 처리에 AOP(관점 지향 프로그래밍)와 유사한 개념을 적용할 수 있게 해줍니다. 많은 프레임워크에서 다양한 목적으로 필터 구현을 사용하며, 간단하게 작성할 수 있고 유용하기 때문에 직접 구현된 필터를 자주 찾을 수 있습니다.

Spring 애플리케이션에서는 대부분의 기능이 Spring 빈(bean)에서 이루어집니다. 하지만 필터 인스턴스는 서블릿 컨테이너에 의해 제어됩니다. 컨테이너가 이를 인스턴스화하고 초기화하며, 필요 시 이를 소멸시킵니다. 서블릿 사양에서는 Spring 통합을 요구하지 않기 때문에, 필터라는 매우 유용한 개념은 있지만 Spring 애플리케이션과 이를 연결하는 편리한 방법이 없는 상태였습니다.

여기서 DelegatingFilterProxy가 등장합니다. 필터를 구현하고 이를 Spring 빈으로 만듭니다. 하지만 web.xml에 필터 클래스를 직접 추가하는 대신, DelegatingFilterProxy를 사용하고, Spring 컨텍스트 내의 필터 빈 이름을 전달합니다. (이름을 명시적으로 제공하지 않으면 기본적으로 filter-name을 사용합니다.) 그런 다음 런타임 시, DelegatingFilterProxy는 실제 구현을 찾아 요청을 해당 필터로 라우팅하는 복잡한 과정을 처리합니다. 그 결과 런타임 시에는 마치 web.xml에 필터를 명시한 것처럼 동작하지만, Spring 빈처럼 이를 연결할 수 있는 이점을 누릴 수 있습니다.

만약 web.xml에서 그 필터 매핑을 제거하면, 모든 것이 계속 동작할 수는 있지만, URL들이 더 이상 보안 처리되지 않을 것입니다. (여기서 springSecurityFilterChain이라는 이름이 실제로 그 필터의 역할을 정확하게 나타낸다고 가정할 때 그렇습니다.) 이는 이 매핑이 들어오는 모든 요청을 필터링하고, Spring 컨텍스트에서 정의된 보안 필터에 해당 요청을 전달하기 때문입니다.


https://stackoverflow.com/questions/6725234/whats-the-point-of-spring-mvcs-delegatingfilterproxy


Spring은 DelegatingFilterProxy라는 Filter 구현체를 제공합니다. 
이를 통해 Servlet 컨테이너의 라이프사이클과 Spring의 ApplicationContext 간의 연결을 가능하게 합니다. 
Servlet 컨테이너는 자체 표준을 사용하여 Filter 인스턴스를 등록할 수 있지만 Spring에서 정의한 Bean들을 알지 못합니다. 
DelegatingFilterProxy를 통해 표준 Servlet 컨테이너 메커니즘을 사용하여 등록할 수 있지만 모든 작업을 Filter를 구현한 Spring Bean에 위임할 수 있습니다.