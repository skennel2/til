# @EnableWebMvc가 해주는것 
1. handler mapping 설정
1. handler adapter 설정
1. view resolver 설정
1. Message Converter 설정
1. Validator 설정
1. Intercepter 설정 

XML 구성에서는 mvc:annotation-driven으로 사용 
@Contoller가 컨트롤러로서 동작하게 해주는것 같다.

# @Import(DelegatingWebMvcConfiguration.class)