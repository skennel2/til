# 멀티스레딩 환경에서 System.out.println 사용하면 안되는 이유
1. System.out에 할당된 객체는 static으로 전역적으로 공유되는 객체이다.
```java
public final static PrintStream out = null;
```
2. PrintStream.println 내부에서 newLine을 호출하는데 synchronized를 사용하고 있다.

```java
    private void newLine() {
        try {
            synchronized (this) {
                ensureOpen();
                textOut.newLine();
                textOut.flushBuffer();
                charOut.flushBuffer();
                if (autoFlush)
                    out.flush();
            }
        }
        catch (InterruptedIOException x) {
            Thread.currentThread().interrupt();
        }
        catch (IOException x) {
            trouble = true;
        }
    }
```

# 결론
멀티스레딩 환경에서 println을 사용할 경우 동시에 하나의 스레드만 newLine함수 내부 블록에 접근 가능해 성능저하로 이어질 수 있다.