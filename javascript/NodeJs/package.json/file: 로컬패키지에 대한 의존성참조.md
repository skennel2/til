# file: 로컬패키지에 대한 의존성참조

package.json - dependencies의 file: 키워드는 npm 레지스트리(인터넷)가 아닌 **"내 컴퓨터의 로컬 폴더"나 "로컬 압축 파일"**을 의존성으로 설치할 때 사용하는 프로토콜이다.  
작동원리는 심볼릭링크이다. node-modules에 로컬패지키명으로 폴더도 생성되지만 로컬 폴더가 복사되는것이 아닌 실제 경로를 가리키는 바로가가이다.  
  
테스트용도말고는 권장되는 방식은 아니다.

```json
{
  "dependencies": {
    // 1. 로컬 폴더를 연결할 때 (가장 흔함)
    "my-local-library": "file:../my-utils",
    
    // 2. 로컬 압축 파일(.tgz)을 설치할 때
    "my-legacy-lib": "file:./libs/legacy-lib-1.0.0.tgz"
  }
}
```