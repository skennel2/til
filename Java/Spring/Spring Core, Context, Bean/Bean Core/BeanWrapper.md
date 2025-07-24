# BeanWrapper
1. org.springframework.beans 
1. 직접적으로 사용되진 않고 BeanFactory, DataBinder에 의해 사용된다.
1. 일반적인 Java Bean (getter, setter 기반 )을 조작하는 기능을 제공한다.

```java
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class BeanWrapperExample {
    public static void main(String[] args) {
        // 빈 객체 생성
        Person person = new Person();
        
        // BeanWrapper를 사용하여 객체의 프로퍼티에 접근
        BeanWrapper beanWrapper = new BeanWrapperImpl(person);

        // 프로퍼티 설정
        beanWrapper.setPropertyValue("name", "John Doe");
        beanWrapper.setPropertyValue("age", 30);

        // 프로퍼티 값 가져오기
        String name = (String) beanWrapper.getPropertyValue("name");
        int age = (Integer) beanWrapper.getPropertyValue("age");

        // 결과 출력
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
```