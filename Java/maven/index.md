# 메이븐 빌드 라이프사이클
다음 3가지가 기본적으로 제공된다.
1. default
1. clean
1. site 

각각의 라이프사이클은 여러개의 메이븐 페이즈(단계)로 구성된다. 

---

# 메이븐 페이즈 
## default의 주요 페이즈 
1. validate
1. compile
1. test-complile
1. test
1. package
1. integration-test
1. install
1. deploy

이렇게 되는데 하나의 페이즈를 실행하면 선행 페이즈까지 실행한다.
mvn deploy를 명령하면 사실상 default 라이프 사이클의 모든 페이즈를 실행하는 것과 같다. 

---

# goal
각 페이즈는 연속된 골로 이루어져있다.
각 골은 하나의 세부적인 작업을 책임진다.
페이즈를 실행할때 이 페이즈에 종속된 모든 골은 순서대로 실행된다.

compile 골 실행 
mvn compiler:compile

---

# 여기까지 정리 
라이프사이클 > 페이즈 > 골

---

# 플러그인
플러그인이란 골을 모아놓은것을 말한다.
하나의 플러그인에 속한 각 골은 하나의 페이즈에만 속할 필요는 없다.