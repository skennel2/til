1. 트랜잭션이 한 레코드의 데이터를 변경하면 변경전 레코드 데이터는 언두로그에 저장된다.
1. 해당 트랜잭션이 롤백되면 언두로그의 데이터를 활용해 데이터를 복구한다. 
1. MVCC: 트랜잭션A가 시작되고 트랜젝션B가 시작되었다 B가 레코드의 값을 변경하였을때 트랜잭션A가 보는 데이터는 언두로그에 있는 데이터 일것이다. (전파레벨에 따라 차이는 존재)
    1. 하나의 필드값에 하나의 원본 값만 저장하는것이 아닌 전파레벨에 따라 여러 버전을 유지하고 폐기힌다.