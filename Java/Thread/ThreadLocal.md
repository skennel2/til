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