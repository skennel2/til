# @HttpExchange  
스프링프레임워크6부터 도입 
인터페이스를 기반으로 Http 클라이언트 선언 방식을 지원
RestTemplate이나 WebClient보다 간단하고 선언적인 방식으로 외부 HTTP API 호출을 구현할 수 있게 해준다.

* 인터페이스 선언만으로 HTTP 클라이언트를 만들 수 있음
* @GetExchange, @PostExchange 같은 전용 애너테이션 지원
* Spring AOT 및 GraalVM Native Image 지원 가능
* @RequestParam, @PathVariable, @RequestHeader, @RequestBody 등 일반 Spring MVC 애너테이션 재사용 가능