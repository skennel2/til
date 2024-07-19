# DriverManagerDataSource
1. org.springframework.jdbc.datasource.DriverManagerDataSource
1. java.sql.DriverManager로 커넥션을 관리한다.
1. 커넥션 풀과는 관련없다. 매 getConnection 메소드 요청마다 커넥션 생성을 시도한다.
