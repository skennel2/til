# ThreadLocal
ThreadLocal 클래스는 Java에서 각 스레드가 고유하게 유지하는 변수를 관리할 수 있도록 제공하는 클래스.
이를 통해 각 스레드가 독립적인 값에 접근할 수 있어 스레드 간 변수 값이 공유되지 않는다. 
ThreadLocal은 주로 멀티스레드 환경에서 스레드-안전성을 확보하기 위해 사용된다.

```java
public class ThreadLocalExample {

    // ThreadLocal 인스턴스 생성
    private static ThreadLocal<Integer> threadLocalValue = ThreadLocal.withInitial(() -> 1);

    public static void main(String[] args) {

        // 스레드 A
        Thread threadA = new Thread(() -> {
            System.out.println("Thread A initial value: " + threadLocalValue.get());
            threadLocalValue.set(100);
            System.out.println("Thread A updated value: " + threadLocalValue.get());
        });

        // 스레드 B
        Thread threadB = new Thread(() -> {
            System.out.println("Thread B initial value: " + threadLocalValue.get());
            threadLocalValue.set(200);
            System.out.println("Thread B updated value: " + threadLocalValue.get());
        });

        threadA.start();
        threadB.start();
    }
}

```
# WAS 환경에서 사용시 주의점
스레드 풀을 사용해 커넥션을 관리할때 하나의 요청에서 세팅한 ThreadLocal의 값이 전혀 다른 요청에서 접근할 수 있는 가능성이 생긴다.
그렇기 때문에 스레드의 사용이 완료된 이후 스레드를 풀에 반환하기 전에 ThreadLocal을 초기화 시키는 작업이 필수적이다.

# 사용처
보통 사용하는 곳에서는 Holder라는 접미사를 붙이는듯하다.
1. SecurityContextHolder
1. RequestContextHolder
    [RequestContextHolder](<../Spring/Spring MVC/RequestContextHolder.md>)