# class JndiObjectFactoryBean
JNDI 오브젝트를 lookup하는 팩토리빈 클래스
보통 서블릿 컨테이너에 데이터 소스에 대한 설정이 저장되어있고 그걸 JNDI로 lookup해 읽어오는 경우에 사용하는듯 하다.

# example

```xml
<GlobalNamingResources>
    <Resource name="jdbc/DatabaseName"
              auth="Container"
              type="javax.sql.DataSource"
              username="dbUser"
              password="dbPassword"
              url="jdbc:postgresql://localhost/dbname"
              driverClassName="org.postgresql.Driver"
              initialSize="20"
              maxWaitMillis="15000"
              maxTotal="75"
              maxIdle="20"
              maxAge="7200000"
              testOnBorrow="true"
              validationQuery="select 1"
              />
</GlobalNamingResources>
```

xml 스키마 베이스 예시 
```xml
<jee:jndi-lookup id="dbDataSource"
   jndi-name="jdbc/DatabaseName"
   expected-type="javax.sql.DataSource" />
```

빈 설정 예시
```xml
<bean id="DatabaseName" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/DatabaseName"/>
</bean>
```
[The Context Container](https://tomcat.apache.org/tomcat-8.0-doc/config/context.html#Resource_Links)
[JNDI Datasource HOW-TO](https://tomcat.apache.org/tomcat-8.0-doc/jndi-datasource-examples-howto.html)
[How to use JNDI DataSource provided by Tomcat in Spring?](https://stackoverflow.com/questions/9183321/how-to-use-jndi-datasource-provided-by-tomcat-in-spring)
[JNDI 를 이용한 DataSource 설정](https://cis1725.tistory.com/11)
