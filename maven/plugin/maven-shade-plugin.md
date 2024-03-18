# 개요
의존성을 포함한 실행 가능한 single jar(이하 uber-jar) 파일을 생성해 주는 플러그인. maven assembly plugin 대신 shade plugin 사용하는게 좋음.

# example
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.2.4</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <createDependencyReducedPom>false</createDependencyReducedPom>
                        <transformers>
                            <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                <mainClass>your.main.class.name</mainClass>
                            </transformer>
                        </transformers>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

# 참고 
([MAVEN] Shade Plugin (1) - 기본 사용법과 Resource Transformer)[https://asuraiv.blogspot.com/2016/01/maven-shade-plugin-1-resource.html]
[https://www.lesstif.com/java/uber-jar-maven-shade-plugin-24446041.html]

