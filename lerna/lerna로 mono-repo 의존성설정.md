테스트 프로젝트 생성및 구조
====================
```bash
npx lerna init  
npx lerna create my_lib
npx lerna create client
```

아래와 같은 구조로 프로젝트가 생성된다.
client, my_lib 는 기본적인 node 프로젝트 뼈대로 만들어진다.
```
lerna 
    - packages 
        - client
        - my_lib
```
---

로컬 프로젝트 의존성 설정
====================

하고 싶은것은
client에서 my_lib을 참조하여 쓰고 싶다. 
아래와 같이 명령하면 

```bash
 npm install my_lib -w client  
```

아래와 같이 정상적으로 참조가 생성된다.

client package.json
```json
    {
        "dependencies": {
            "my_lib": "^0.0.0"
        }
    }
```

의문1 
====================
아레 명령어를 수행하지 않고 package.json을 편집하고 작업했을때 정상적으로 참조되지 않는다. 
__npm install my_lib -w client__ 

##### 참고1
아래 명령을 시도하기전에 
__npm install my_lib -w client__ 
아래 명령을 먼저시도했다. add 명령은 폐기된것 같다.
__npx lerna add my_lib --scope=@client__

##### 참고2
yarn과 같은 프로젝트 업데이트 명령어는 기존 아래와 같았는데 
__lerna bootstrap__
역시 deprecated되었고 프로젝트 루트에서 아래와 같이 쓰면된다.
__npm install__
아마도 의문1에서 npm install을 하지않았거나 다른 프로젝트에서 진행해서 정상적으로 
처리되지 않은것같다. 

Run Task
====================

아래 명령은 lerna로 관리되는 모든 프로젝트의 build라고 명시된 npm script를 실행한다.

```bash
npx lerna run build
```

아래 명령은 test, build, lint 스크립트를 concurrently하게 실행한다.

```bash
npx lerna run test,build,lint
```

참고
====================
[공홈](https://lerna.js.org/docs/features/run-tasks)

