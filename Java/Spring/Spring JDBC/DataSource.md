# DataSource와 JNDI
보통은 애플리케이션 레벨에서 커넥션풀(Apache DBCP)을 관리하지만 서버 레벨의 커넥션 풀을 사용할수도 있다. 
이때는 JNDI로 DataSource를 lookup해 빈으로 생성해야한다.

# DriverManagerDataSource
1. org.springframework.jdbc.datasource.DriverManagerDataSource
1. java.sql.DriverManager로 커넥션을 관리한다.
1. 커넥션 풀과는 관련없다. 매 getConnection 메소드 요청마다 커넥션 생성을 시도한다.

# SimpleDriverDataSource
1. org.springframework.jdbc.datasource.SimpleDriverDataSource
1. 커넥션 풀과는 관련없다. 매 getConnection 메소드 요청마다 커넥션 생성을 시도한다.