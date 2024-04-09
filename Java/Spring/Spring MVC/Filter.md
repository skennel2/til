# GenericFilterBean
1. org.springframework.web.filter
1. 

# OncePerRequestFilter
1. org.springframework.web.filter
1. abstract class OncePerRequestFilter extends GenericFilterBean
1. 주요 필터링 로직은 abstract doFilterInternal의 구현이고, 이것이 요청딩 한번만 이루어지는 것을 보장한다. 
1. ServletRequest에 마크용 어트리뷰트를 붙여 이미 필터링된것인지를 체크한다.