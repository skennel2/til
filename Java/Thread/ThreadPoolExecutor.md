# ThreadPoolExecutor
1. java.util.concurrent 패키지
1. 비용이 많이 드는 스레드 생성/제거를 줄이면서 병렬 작업을 효율적으로 실행
1. 미리 만들어둔 스레드 풀을 이용하여 작업(Runnable/Callable)을 처리

생성자
```java
public ThreadPoolExecutor(
    int corePoolSize,              // 기본 스레드 수
    int maximumPoolSize,           // 최대 스레드 수
    long keepAliveTime,            // 유휴 스레드가 살아있는 시간
    TimeUnit unit,                 // keepAliveTime의 단위
    BlockingQueue<Runnable> workQueue, // 작업 큐
    ThreadFactory threadFactory,   // 스레드 생성 방법
    RejectedExecutionHandler handler // 작업 거부 전략
)
```