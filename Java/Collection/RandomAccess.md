# ArrayList에 붙은 RandomAccess 마커인터페이스
ArrayList는 RandomAccess 인터페이스를 확장한다. RandomAccess는 메소드가 하나도 없는 마커인터페이스이다. 이게 의미하는 것은 이 클래스는 랜덤액세스에 최적화되어있다는 것이다. 랜덤엑세스가 가능하다는 것은 어떤 인덱스에 해당하는 항목을 찾을때 O(1)를 시간복잡도를 가진다는 것을 말한다. 즉 get(1)이나 get(100)이나 동일한 시간복잡도를 가진다는 것이다. 
```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

# 활용처가 있을까?
알고리즘에서 이를 활용하는 예시가 있다. 자바의 공통 유틸리티인 Collections.binarySearch() 같은 메서드는 리스트가 RandomAccess를 구현했는지 여부를 체크하여 동작 방식을 결정한다.

```java
if (list instanceof RandomAccess) {
    // 인덱스를 이용한 빠른 for문 사용 (O(1) 접근 활용)
    for (int i=0; i<list.size(); i++) {
        list.get(i);
    }
} else {
    // Iterator(또는 연결 리스트에 최적화된 방식) 사용
    for (Element e : list) {
        // ...
    }
}
```
* ArrayList에서 get(i)는 매우 빠르지만, LinkedList에서 get(i)는 해당 인덱스까지 노드를 하나하나 타고 가야 하므로 성능이 매우 떨어진다.
* 따라서 RandomAccess 인터페이스가 있으면, 알고리즘이 "이 리스트는 get(i)를 써도 빠르구나"라고 판단하여 가장 성능이 좋은 경로를 택하게 된다.
