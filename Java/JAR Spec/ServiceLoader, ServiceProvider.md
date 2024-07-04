# Service Provider
1. jar의 SPI 스펙과 연관된다.
    1. https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#Service_Provider
1. META-INF/services 디렉터리의 파일들은 서비스 제공자 구성 파일
    1. mariadb jdbc의 META-INF/services 내용
        1. META-INF/services/java.sql.Driver 파일존재
            1. 파일내용 
                1. org.mariadb.jdbc.Driver
1. Service란 Well-known한 인터페이스나 클래스(보통 abstract)를 말한다.
1. Service Provider란 Service의 특정 구현체를 말한다.
1. ioc의 개념으로 인터페이스의 구현체를 클래스패스에서 찾는다.

# Service Provider의 3요소
1. Service  
1. Service Provider Interface (SPI)
1. SPI 구현체

# ServiceLoader 클래스
1. java.util.ServiceLoader
1. 런타임에 SPI의 구현체를 동적으로 로드한다.

어떻게 보면 DI 프레임워크와 서비스로더는 비슷한 문제를 해결한다. 
서비스로더가 여전히 유효한 best practice일지는 검증이 필요할거같다.

# 정리 
 
@ 
jar파일 스펙인 META-INF라는 디렉토리는 메타데이터가 담겨져있다. 서비스 프로바이더 관련 설정은 META-INF/services에 담긴다.  
META-INF/services에 인터페이스의 이름으로 생성된 파일이 존재하고 이름이 되는 인터페이스는 SPI라고 부른다.
파일의 내용으로는 SPI의 구현체의 풀네임(FQN)이 와야하고 해당 풀네임을 가지는 클래스는 SPI 구현체가 된다.
  
예를 들어, META-INF/services/java.sql.Driver 파일이 있다면, java.sql.Driver 인터페이스를 구현한 클래스들이 해당 파일에 나열된다. 
이 파일의 내용은 구현체 클래스의 완전한 이름(Fully Qualified Name, FQN)이다.
이를 통해 서비스 로더(ServiceLoader)가 해당 인터페이스의 구현체를 찾고 로드할 수 있게 됩니다.

# 
1. https://docs.oracle.com/javase/tutorial/ext/basics/spi.html#introduction