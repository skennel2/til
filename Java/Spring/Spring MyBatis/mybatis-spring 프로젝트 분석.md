# 핵심적인 빈 SqlSessionFactory
SqlSessonFactoryBean이라는 FactoryBean을 통해서 빈 설정을 할수있다.
DataSource, 모든 Mapper(xml) 파일 등록, 기타 공통 설정을 담당하는 Configuration을 설정해준다. 
  
## mapper 리소스 등록
SqlSessonFactoryBean으로 매퍼들을 등록하는 방법은 아래와 같다.
ResourcePatternResolver의 getResources는 패턴을 인자로 받아 모든 해당하는 모든 Resources 배열을 리턴한다.

```java
	@Autowired
	ResourcePatternResolver resourcesLoader;

    bean.setMapperLocations(resourcesLoader.getResources("classpath:static/**/*.xml"));
```

## Configuration 등록
여러 설정 정보를 담고있는 Configuration을 설정하는 방법은 다음과 같다. 
참고로 이러한 설정정보를 이전버전에는 xml설정 파일로만 받았다.

```java
    Configuration config = new Configuration();
    config.setMapUnderscoreToCamelCase(true);
    
    bean.setConfiguration(config);
```

# MapperFactoryBean
매퍼 인터페이스의 구현체가 될 빈을 생성하는 FactoryBean이다.
일반적으로는 @Mapper 어노테이션으로 자동 스캔기능을 사용하겠지만 (@MapperScan)
직접 이 클래스로 빈을 생성해 등록할수도 있다. 

# 참고 
https://mybatis.org/spring/ko/factorybean.html