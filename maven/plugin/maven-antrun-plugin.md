# 
아래 설정으로 패키지후 war파일을 특정경로로 복사 시킬수 있다.

# 
```xml
<!-- war 파일 복사를 위한 maven-antrun-plugin 설정 -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-antrun-plugin</artifactId>
    <version>3.0.0</version>
    <executions>
        <execution>
            <id>copy-war</id>
            <phase>package</phase>
            <goals>
                <goal>run</goal>
            </goals>
            <configuration>
                <target>
                    <!-- war 파일을 특정 경로로 복사 -->
                    <copy file="${project.build.directory}/${project.build.finalName}.war"
                            tofile=".../tomcat/apache-tomcat-8.5.99/webapps/${project.build.finalName}.war"/>
                </target>
            </configuration>
        </execution>
    </executions>
</plugin>
```