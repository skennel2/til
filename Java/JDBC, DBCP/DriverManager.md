# DriverManager 클래스 
```java 
public class DriverManager extends Object
```

1. java.sql.DriverManager
1. JDBC 드라이버 세트를 관리하기위한 기본 서비스
    1. Driver를 등록하고 제거할수있는 기능을 제공한다.
1. Db커넥션을 얻는기능을 제공한다.
    1. Note: DataSource 인터페이스
        1. JDBC2.0 에 도입됨, db에 연결하는 또 다른 방법을 제공하며 DriverManager보다 좀더 권장되는 방식이다.
1. system 프로퍼티의 jdbc.drivers 속성을 참고해 드라이버 클래스를 로드한다. 
1. ServiceProvider 매커니즘으로 동작가능하다.
    1. []
1. 더 이상 Class.forName으로 명시적으로 드라이버를 로드하지 않아도 된다.
    1. getConnection 메소드를 호출하면 로드된 드라이버중 적합한 드라이버를 찾으려고 시도한다.
 

## 주요메소드
static Connection getConnection(String url)
static Driver getDriver(String url)
static void	registerDriver(Driver driver)
static void	deregisterDriver(Driver driver)