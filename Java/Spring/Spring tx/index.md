# PlatformTransactionManager
트랜젝션 추상화에 주 인터페이스 

```java
public interface PlatformTransactionManager {

    TransactionStatus getTransaction(
            TransactionDefinition definition) throws TransactionException;

    void commit(TransactionStatus status) throws TransactionException;

    void rollback(TransactionStatus status) throws TransactionException;
}
```
## 구성요소 
TransactionDefinition: 트랜잭션의 속성(전파, 격리 수준, 타임아웃 등)을 정의  
TransactionStatus: 트랜잭션의 현재 상태를 나타냄  

## 구현체들
1. DataSourceTransactionManager: JDBC 기반 트랜잭션 관리.
1. JpaTransactionManager: JPA 기반 트랜잭션 관리.
1. HibernateTransactionManager: Hibernate 전용 트랜잭션 관리.
1. JtaTransactionManager: 분산 트랜잭션(JTA) 지원.

---