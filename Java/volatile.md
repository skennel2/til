# volatile 키워드 
volatile로 선언되면 해당 변수를 읽는 어떤 스레드도 해당 변수의 가장 최근에 쓰여진 값을 볼 수 있도록 보장된다.
CPU캐시가 아닌 메인메모리의 값을 직접 보도록한다.

하지만 가시성만 보장할뿐 원자성을 제공하지는 않는다. 
volatile이 쓰여도 경쟁조건을 발생할 수 있다.

```java
public class VolatileExample {
    private volatile boolean flag = false;

    public void setFlag() {
        flag = true; // write operation
    }

    public boolean isFlagSet() {
        return flag; // read operation
    }
}
```