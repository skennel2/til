# package.json 과 package-lock.json 
package.json은 의존패키지의 허용범위를 기재한다.  

```json
"moment": "^2.30.1"
``` 

위와 같이 명시했을때 정확히 2.30.1을 설치하는것이 아닌 ^에 따라 2.31.0같은 마이너업데이트가 존재할떄 해당버전을 설치할수도 있다. 
반면 package-lock.json은 정확히 어떤 버전의 패키지를 설치했는지가 하위 의존성까지 포함하여 명시된다.  

# npm install과 package-lock.json 

npm install은 package-lock.json이 없으면 현재 기준으로 파일을 생성한다. 파일이 있다면 기본적으로 package-lock.json에 기록된(하위 의존성 포함) 버전을 그대로 설치하여 환경을 유지한다. 단, 개발자가 package.json을 수정해 두 파일 간 **내용이 불일치(Sync가 깨짐)**하는 경우에는, package.json을 기준으로 새 버전을 설치하고 **package-lock.json을 갱신(수정)**합니다.
  
그러면 package.json파일에 대한 package-lock.json이 이미 생성되어있고 둘의 싱크가 맞는다면 npm install 했을때 package-lock.json이 변경되지 않는것이 보장되는것인가?  아쉽게도 100% 보장되지는 않는다. npm install을 실행하는 환경에 따라 package-lock.json 파일의 내용이 변경될 수 있다. 여기서 말하는 환경은 크게 아래 3가지 이다.
1. npm버전이 다른경우 
2. 저장소 주소(Registry)가 다른 경우
3. 운영체제(OS)가 다른 경우 (Optional Dependencies)

# npm ci
파일이 절대 변경되지 않음을 보장받고 싶다면 npm install 대신에 npm ci 명령어를 사용해야 한다.

* npm install: "싱크가 맞으면 유지하려고 노력은 할게. 근데 환경 다르면 바꿀 수도 있어." (유동적)
* npm ci: "나는 파일 수정 권한이 없어. 환경이 다르거나 싱크 안 맞으면 그냥 에러 내고 죽을게." (절대적)

# 그러면 npm update는 뭘하는걸까?
npm install과 npm update의 가장 큰 차이점은 **package-lock.json에 기록된 버전을 지키느냐(Install), 아니면 무시하고 새 버전을 찾아오느냐(Update)**에 있다.  
npm update는 package.json의 범위(^, ~)를 보고 레지스트리 검색후 허용된 범위내에서 최신버전으로 수정하고 설치한다. 

* npm install: "Lock 파일대로 깔아줘." (현상 유지)
* npm update: "새 버전 나왔는지 확인해서 깔아줘." (버전 업그레이드)

