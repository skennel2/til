# 테스트 프로젝트 생성및 구조
```bash
npx lerna init  
npx lerna create my_lib
npx lerna create client
```

아래와 같은 구조로 프로젝트가 생성된다.
client, my_lib 는 기본적인 node 프로젝트 뼈대로 만들어진다.
생성된 프로젝트는 lerna에 대한 의존성을 가지지는 않는다.

```
lerna 
    - packages 
        - client
        - my_lib
```

# 로컬 프로젝트 의존성 설정

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

npm install -w 명령어에서 -w 옵션은 --workspace의 단축 표현.
이 옵션은 npm 워크스페이스를 사용하는 프로젝트에서 특정 워크스페이스의 종속성만 설치하도록 지시한다.
예를 들어, 다음과 같이 사용할 수 있다:

```bash
npm install -w workspace-name
```

# 의문1 
아레 명령어를 수행하지 않고 package.json을 편집하고 작업했을때 정상적으로 참조되지 않는다.  
```bash
npm install my_lib -w client
```

__참고1__
아래 명령을 시도하기전에 
```bash
npm install my_lib -w client
```
아래 명령을 먼저시도했다. add 명령은 폐기된것 같다.
```bash
npx lerna add my_lib --scope=@client
```

__참고2__
yarn과 같은 프로젝트 업데이트 명령어는 기존 아래와 같았는데 
```bash
lerna bootstrap
```
역시 deprecated되었고 프로젝트 루트에서 아래와 같이 쓰면된다.
```bash
npm install
```

아마도 의문1에서 npm install을 하지않았거나 다른 프로젝트에서 진행해서 정상적으로 
처리되지 않은것같다. 

# Run Task

아래 명령은 lerna로 관리되는 모든 프로젝트의 build라고 명시된 npm script를 실행한다.

```bash
npx lerna run build
```

아래 명령은 test, build, lint 스크립트를 concurrently하게 실행한다.

```bash
npx lerna run test,build,lint
```

# 참고
[공홈](https://lerna.js.org/docs/features/run-tasks)

