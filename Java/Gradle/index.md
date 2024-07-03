# Initializing the Project

https://docs.gradle.org/current/userguide/partr1_gradle_init.html

```bash
gradle init --type java-application  --dsl kotlin
```
## 기본 프로젝트 구조
루트 프로젝트에 서브 프로젝트가 포함된 구조
하나의 루트 프로젝트에는 하나나 복수의 서브프로젝트와 빌드스크립트, gradle래퍼가 포함되어있다.

gradle래퍼는 루트 프로젝트에 로컬로 존재하지만, Gradle 실행 파일은 GRADLE_USER_HOME에 있습니다.

## 기본 프로젝트 디렉토리/파일 구조 

root - gradlew  
root - gradlew.bat  
gradle래퍼 start 스크립트  
  
root - settings.gradle.kts  
서브프로젝트들의 정보가 정의되어있다.  
  
root - app  
'app' 서브프로젝트  
  
root - app - build.gradle.kts  
'app' 서브프로젝트의 빌드 스크립트  

# settings.gradle.kts
```kts
rootProject.name = "authoring-tutorial"
include("app")
```

rootProject.name
빌드명을 정의한다.

include
빌드에 포함할 서브프로젝트를 정의한다.

# build.gradle.kts
```kts
// 플러그인 정의
plugins {
    id("application")                                               
}

// 디펜던시를 해석할때 메이븐을 이용한다. 
repositories {
    mavenCentral()                                                  
}

dependencies {
    //  JUnit Jupiter를 테스팅으로 활용한다. 
    testImplementation(libs.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation(libs.guava)                                      
}

// 자바 툴체인 버전을 명시한다.
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(11)                
    }
}

// 메인클래스를 정의한다.
application {
    mainClass = "org.example.App"                                   
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}                                           
```

# Understanding the Build Lifecycle

