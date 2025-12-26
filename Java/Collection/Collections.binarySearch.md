# Collections.binarySearch
이진 탐색(Binary Search) 알고리즘 구현체이다. 정렬된 리스트에서 특정 요소의 위치를 매우 빠르게 찾아내는 역할. 이진 탐색은 전체를 하나하나 확인하는 순차 탐색과 달리, 중간값을 선택하여 탐색 범위를 절반씩 줄여나가는 방식이다.  

찾는값과 중간값 비교 -> 대상범위 재설정의 반복 

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 3, 5, 7, 9));
int index = Collections.binarySearch(list, 7);
```

* ArrayList에서는 매우 빠르지만, LinkedList에서는 구조적 한계로 인해 순차 탐색과 비슷한 성능을 낸다.
* 정렬되어있지 않다면, 예측할 수 없는 잘못된 값을 반환하니 주의해야한다.

# 사용자 정의 정렬 Comparator
기본적인 숫자나 문자열 외에 객체를 검색할 때는 정렬 기준을 직접 알려줘야 한다.

```java
Collections.binarySearch(userList, targetUser, (u1, u2) -> u1.getId().compareTo(u2.getId()));
```