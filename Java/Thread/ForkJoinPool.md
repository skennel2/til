1. ForkJoinPool은 jvm 레벨에서 관리되는 스레드풀이다.
    1. Parallel stream이 내부적으로 ForkJoinPool을 사용한다.
    1. 모든 ForkJoinPool을 사용하는 작업들은 이 스레드풀을 공유한다.
    1. ForkJoinPool 스레드 풀의 크기는 가용 프로세서 수에 기반하여 설정된다. 
1. ForkJoinPool은 작업을 여러 하위 작업으로 분할하여 병렬로 처리한다.
    1. 워크 스틸링: 각 스레드가 자신의 작업큐에서 작업을 가져와 실행하고 자신이 처리할 작업이 없다면 다른 스레드의 큐에서 작업을 가져온다.
        1. 이로 인해 각 스레드가 작업을 균등하게 처리할수 있게 된다.
1. ForkJoinPool의 주요 목적은 순서가 중요하지 않은 CPU Intensive한 작업을 병렬로 처리하는 것이다.
    1. 블로킹되는 IO 작업이 실행될 경우 스레드가 빈번하게 대기상태에 놓이게 되어 비효율적이다.
    1. IO 작업에는 ThreadPoolExecutor와 같은 일반적인 스레드풀이 더 유리하다.

```java
import java.util.concurrent.ForkJoinPool; 
import java.util.concurrent.RecursiveTask; 
  
public class RecursiveTaskDemo { 
    public static void main(String[] args) 
    { 
        ForkJoinPool fjp = new ForkJoinPool(); 
  
        double[] nums = new double[5000]; 
        for (int i = 0; i < nums.length; i++) { 
            nums[i] = (double)(((i % 2) == 0) ? i : -1); 
        } 
        Sum task = new Sum(nums, 0, nums.length); 
        double summation = fjp.invoke(task); 
        System.out.println("Summation " + summation); 
    } 
} 
  
class Sum extends RecursiveTask<Double> { 
    final int seqThreshold = 500; 
    double[] data; 
    int start, end; 
  
    Sum(double[] data, int start, int end) 
    { 
        this.data = data; 
        this.start = start; 
        this.end = end; 
    } 
  
    @Override
    protected Double compute() 
    { 
        double sum = 0; 
        if ((end - start) < seqThreshold) { 
            for (int i = start; i < end; i++) 
                sum += data[i]; 
        } 
        else { 
            int middle = (start + end) / 2; 
  
            Sum subtaskA = new Sum(data, start, middle); 
            Sum subtaskB = new Sum(data, middle, end); 
  
            subtaskA.fork(); 
            subtaskB.fork(); 
  
            sum += subtaskA.join() + subtaskB.join(); 
        } 
        return sum; 
    } 
} 
```