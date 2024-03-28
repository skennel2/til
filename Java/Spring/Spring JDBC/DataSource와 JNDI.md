보통은 애플리케이션 레벨에서 커넥션풀(Apache DBCP)을 관리하지만 서버 레벨의 커넥션 풀을 사용할수도 있다. 
이때는 JNDI로 DataSource를 lookup해 빈으로 생성해야한다.

