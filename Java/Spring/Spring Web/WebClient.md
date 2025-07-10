# WebClient
외부 API와 통신하기 위한 Spring의 HTTP클라이언트
1. Spring 5부터 등장했고, Spring WebFlux의 일부이지만 Spring MVC에서도 사용할 수 있다.
1. RestTemplate와 같은 HttpClient이지만 보다 더 현대적인 기능 제공
1. 비동기 및 리액티브 방식 지원 (Mono, Flux 기반)
1. JSON, XML, 폼 등 다양한 포맷지원
1. 커스터마이징 유연함 (헤더, 필터, 에러 처리등)
1. 네이티브 AOT(GraalVM) 친화적

빈으로 등록해 공통적인 기능들을 미리 정의해놓는 방식으로 사용가능
