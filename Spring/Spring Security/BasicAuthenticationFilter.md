# BasicAuthenticationFilter 

패키지: package org.springframework.security.web.authentication.www
상속구조 - Filter - GenericFilterBean - OncePerRequestFilter - BasicAuthenticationFilter

HTTP BASIC authorization headers를 처리해 그 결과를 SecurityContextHolder에 담는 필터이다. 

HTTP BASIC authorization headers에 대한 자세한 내용은 아래를 참고
http://www.faqs.org/rfcs/rfc1945.html Section 11.1

HttpSecurity#httpBasic


