# Nginx의 핵심역할
1. 웹서버 
    * HTML, CSS, JavaScript, 이미지 같은 정적 리소스를 클라이언트(브라우저)에게 매우 빠르게 전송한다.
2. 리버스 프록시
    * 클라이언트와 백엔드서버 사이의 중개자 역할을 한다. 
    * 사용자는 실제 백엔드서버의 존재를 모르고 Nginx와만 통신한다. 
    * CORS해결 - 프론트엔드와 백엔드를 같은 도메인/포트로 묶어주어 브라우저의 CORS 에러를 회피할 수 있게 해준다.
3. 로드밸런싱
    * 요청이 너무 많을 경우, Nginx가 뒤에 있는 여러 대의 서버(예: Spring Boot 서버 1, 2, 3)로 트래픽을 분산시켜 준다.
    * 서버 하나가 죽어도 다른 서버로 연결해주어 무중단 서비스를 가능하게 한다.

# 아키텍쳐 
* Event-Driven, 비동기 논블로킹
    * **소수의 스레드**가 여러 요청을 논블로킹 이벤트 형태로 처리한다. (마치 NodeJs 서버처럼)
    * 따라서 적은 메모리로도 수만 개의 동시 접속을 거뜬히 처리할 수 있다.

# 리버스 프록시구축 예제 시나리오 
시나리오
* 서버 환경: Ubuntu (Linux)
* 도메인: example.com (없으면 IP 주소 사용)
* 목표:
    1. example.com/ 접속 시 → React (프론트엔드) 보여줌
    1. example.com/api/ 접속 시 → Spring Boot (백엔드, 8080포트) 로 연결
---
* 1단계 설치 
```bash 
sudo apt update
sudo apt install nginx
```

* 2단계 설정파일생성 
/etc/nginx/sites-available/
```bash 
# myapp이라는 이름의 설정 파일 생성
sudo vi /etc/nginx/sites-available/myapp   
```

* 3단계 설정코드작성
```Nginx
server {
    # 1. 80번 포트(HTTP) 리스닝
    listen 80;
    server_name example.com; # 도메인이 없다면 서버의 공인 IP 입력

    # 로그 경로 설정 (에러 발생 시 확인용)
    access_log /var/log/nginx/myapp_access.log;
    error_log /var/log/nginx/myapp_error.log;

    # ----------------------------------------------------
    # A. 프론트엔드 (React) 설정
    # ----------------------------------------------------
    location / {
        # React 빌드 파일이 위치한 경로 (npm run build 결과물)
        root /home/ubuntu/my-project/frontend/build;
        index index.html index.htm;

        # SPA(Single Page Application) 새로고침 시 404 방지 설정
        try_files $uri $uri/ /index.html;
    }

    # ----------------------------------------------------
    # B. 백엔드 (Spring Boot) 리버스 프록시 설정
    # ----------------------------------------------------
    location /api {
        # 1. 내부의 Spring Boot 서버로 요청을 토스 (localhost:8080)
        proxy_pass http://localhost:8080;

        # 2. 실제 사용자의 IP 등의 정보를 헤더에 담아 백엔드로 전달
        # (이게 없으면 Spring은 요청자가 Nginx라고 착각함)
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 3. 타임아웃 설정 (대용량 엑셀 처리 등을 위해 넉넉히 설정 추천)
        proxy_connect_timeout 60s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}
```

* 4단계 설정 활성화 및 테스트
```
# 심볼릭 링크 생성 (활성화)
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# 문법 오류 검사 (성공 시 'syntax is ok' 출력됨)
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```