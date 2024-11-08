# RequestContextHolder
HTTP 요청과 관련된 정보를 스레드 로컬(ThreadLocal)에 저장하고 접근할 수 있도록 도와주는 클래스
웹 요청의 정보를 스레드에 바인딩하여 어디서든 현재 요청 정보를 조회할 수 있게 해준다.

1. 패키지 org.springframework.web.context.request
1. 인스턴스화 될수 없는 클래스 static 메소드들을 제공
1. 필터, 인터셉터, AOP(Aspect-Oriented Programming)에서 현재 요청 정보를 사용할 때 유용

```java 
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class ExampleService {

    public void someMethod() {
        // 현재 요청의 HttpServletRequest를 가져오기
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String clientIp = request.getRemoteAddr();
            // 클라이언트 IP를 로깅하거나 다른 용도로 활용 가능
            System.out.println("Client IP: " + clientIp);
        }
    }
}
```