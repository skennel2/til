# choco
 윈도우 패키지 매니저

# 초코로 패키지 설치 예시
```bash
choco install openjdk 
```

# 초코로 설치한 패키지 확인
```bash
choco list --localonly
```

# 설처되는 경로 
초코로 설치한 openjdk의 경로는
초코 임의의 경로에 모아져서 설치되는 것은 아니고 일반적인 패키지별 설치경로에 설치되고 
환경변수 까지 잡혀있다.

# ?
?choco로 git을 설치하고 커맨드에서 git 명령어가 동작하지 않는 문제가 있었는데
refreshenv 이 명령어를 입력하니까 동작함
