# 스프링 빈 메타 정보 BeanDefinition 인터페이스
1. org.springframework.beans.factory.config 패키지
1. 스프링 빈에 대한 메타정보로 객체화 하기위한 정보를 담고있다. 
1. java config나 xml등의 소스로 부터 읽어와 BeanDefinition화 되고 ApplicationContext로 전달된다.
1. 스프링 설정정보를 담고있는 소스의 형태에 의존되지 않게한다.
1. 담고있는것 
    1. 빈클래스 이름 
    1. 프로퍼티 정보 목록
    1. 스코프 (ex: 싱글톤)
1. 주요 concrete 클래스
    1. RootBeanDefinition
    1. GenericBeanDefinition
