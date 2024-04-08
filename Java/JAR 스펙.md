# jar 파일
1. META-INF 디렉토리를 포함한다. (선택적)
1. java 커맨드라인 도구로 생성
    1. ex) jar cf HelloWorld.jar HelloWorld.class

# META-INF 구성
1. MANIFEST.MF
    1. 메타정보
1. x.SF
    1. 서명파일
1. services/
    1. 모든 ServiceProvider 설정 파일들이 포함된다.

# menifest
1. 

# menifest main 속성

JAR 파일의 메니페스트(Manifest)는 JAR 파일에 대한 메타데이터를 포함하는 특별한 파일입니다. 
이 메타데이터에는 JAR 파일의 속성 및 구성 정보가 포함되어 있습니다. 
일반적으로 JAR 파일의 메니페스트는 JAR 파일의 첫 번째 항목으로 META-INF/MANIFEST.MF 경로에 위치합니다.
  
메니페스트에는 다음과 같은 내용이 포함될 수 있습니다:
  
1. Main-Class: 실행 가능한 JAR 파일의 경우, 메니페스트에는 메인 클래스(main class)의 이름이 지정됩니다. 이것은 JAR 파일이 실행될 때 JVM이 시작할 클래스입니다.
1. Class-Path: JAR 파일이 다른 JAR 파일에 의존하는 경우, 이 의존성을 명시할 수 있습니다. Class-Path 항목은 JAR 파일의 경로를 나열하여 JAR 파일이 실행될 때 해당 JAR 파일을 찾을 수 있도록 지정합니다.
1. Dependencies: Maven과 같은 의존성 관리 도구를 사용하여 생성된 JAR 파일의 경우, 메니페스트에는 해당 프로젝트의 의존성에 대한 정보가 포함될 수 있습니다.
1. Built-By, Build-Date: JAR 파일을 생성한 사람 또는 빌드 날짜와 같은 빌드 정보가 포함될 수 있습니다.
1. Version: JAR 파일의 버전 정보가 포함될 수 있습니다.
1. 이외의 사용자 정의 속성: 필요에 따라 메니페스트에 추가적인 사용자 정의 속성을 포함할 수 있습니다.

메니페스트의 구조는 일반적으로 다음과 같습니다

```
Manifest-Version: 1.0
Main-Class: com.example.Main
Class-Path: dependency1.jar dependency2.jar
``` 

[JAR File Specification](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#Service%20Provider)
