# SqlSessionTemplate
1. SqlSession의 구현체이다.
1. SqlSession은 보통 지역변수로 사용되는 성격이지만 빈으로 관리될수있는 스레드 세이프한 객체이다.
1. Spring의 트랜잭션 관리와 연동하여 현재 Spring 트랜잭션과 연결된 실제 SqlSession을 사용하도록 보장한다.
1. 세션의 생명주기를 알아서 관리한다. (open, close, commit, rollback) 
    1. 이 때문에 commit, rollback, close 등의 메소드들을 호출시 UnsupportOperationException을 던진다.

# 어떤식으로 트랜젝션의 SqlSession을 사용하도록 보장하는걸까?
내부에 SqlSession을 필드로 가지고 있는데 이 SqlSession은 생성자에서 프록시로 인스턴스화된다.
```java
private final SqlSession sqlSessionProxy;
```

이때 프록시 인터셉트 코드에서 실질적인 SqlSession을 가지고 올때 org.mybatis.spring.SqlSessionUtils.getSqlSession을 사용한다.

```java
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
      SqlSession sqlSession = getSqlSession(SqlSessionTemplate.this.sqlSessionFactory,
          SqlSessionTemplate.this.executorType, SqlSessionTemplate.this.exceptionTranslator);
        ... 
    }
```
getSqlSession은 트랜잭션 매니저로부터 SqlSession을 가져오거나, 필요한 경우 새 SqlSession을 생성한다.
이 부분이 트랜젝션의 SqlSession사용하도록 보장하는 부분의 핵심이다. 

? 왜 호춯마다 getSqlSession을 호출하지 않고 굳이 SqlSession의 프록시로 동작하게 하는걸까

getSqlSession에서 SqlSessionHolder
