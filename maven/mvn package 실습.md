# 콘솔앱 package 과정 
1. mvn 명령어를 사용할수 있게 maven 설치
    1. mvn을 프로젝트에 포함시키는 mvn wapper도 존재하니 참고
1. mvn 프로젝트 뼈대 생성
    ```bash
    mvn archetype:generate -DgroupId=com.example -DartifactId=myproject -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
    ```
1. main함수를 포함한 클래스 작성
1. jar로 package
    ```bash
    mvn clean package
    ```
    1. ./target에 jar파일이 떨어지는것을 확인
1. jar 실행 
    ```bash
    java -jar ./target/myproject-1.0-SNAPSHOT.jar 
    ```
    1. __jar에 기본 Manifest 속성이 없습니다.__ 에러 발생
        1. 이 에러는 메인클래스가 무엇인지 몰라서 발생하는 에러, 메니페스트 메타데이터에 메인클래스를 명시해줘야함 (Main-Class 속성)
        1.  Maven 빌드 과정 중에 Manifest 파일을 생성하여 JAR 파일에 포함시킵니다. 이를 위해 Maven의 #maven-jar-plugin을 사용할 수 있습니다.
        

# maven-jar-plugin
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>your.main.class.name</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

# spring-context 붙여서 빌드해보기 
1. pom.xml 편집
    ```xml
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.32</version>
    </dependency>
    ```
1. 종속성 설치및 package 
    1. mvn install
    1. mvn clean package 
1. jar 파일 실행 -> java.lang.ClassNotFoundException 
    1. maven-assembly-plugin로 fat jar 방식으로 재 package 
    1. fat jar로 package하면 두개의 jar파일이 target 폴더에 떨어진다.
    1. 이중 하나는 모든 종속성이 하나로 묶이며 크기도 훨씬 크다.
    1. 현재는 __maven-shade-plugin__ 이걸더 많이 쓰는듯? (uber-jar)

# maven-assembly-plugin
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
            <manifest>
                <addClasspath>true</addClasspath>
                <mainClass>com.example.App</mainClass>
            </manifest>
        </archive>                
    </configuration>
    <executions>
        <execution>
            <id>assemble-all</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>    
```

# maven-shade-plugin
```xml
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>2.4.3</version>
        <configuration>
            <createDependencyReducedPom>false</createDependencyReducedPom>
            <transformers>
                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                    <mainClass>com.example.App</mainClass>
                </transformer>
            </transformers>
        </configuration>
        <executions>
            <execution>
                <phase>package</phase>
                <goals>
                    <goal>shade</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
</plugins>
```