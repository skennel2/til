# CLI 프로젝트 생성 

```bash
npx create-nx-workspace
```

# TASK

## 단일 Task실행
products 프로젝트의 test task를 실행 
```bash
npx nx test products --watch 
```

## 여러 프로젝트의 Task를 실행

run-many 키워드 이용
```bash
npx nx run-many -t build
npx nx run-many -t build lint test
npx nx run-many -t build lint test -p header footer
```

여러 Task를 실핼할 경우 

## Task 파이프라인 
nx는 자동으로 프로젝트간의 종속성을 이해하고 있다. (프로젝트 그래프)
