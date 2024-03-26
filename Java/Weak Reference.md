1. WeakReference는 weakly reachable 상태일때 가비지컬렉터에 의해서 정리된다.
1. weakly reachable이란 해당 객체를 가르키는 Strong Reference나 Soft Reference가 없다는 말이다.
    1. 즉 오직 WeakReference에 의해서만 참조되는 객체
1. SoftReference, WeakReference, PhantomReference 이 세가지 특수한 참조용 객체는 reference object 라고 부른다.
1. reference object의 실질적인 대상이되는 객체는 referent 라고한다.


ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ

# 사용처 
1. canonicalizing mappings
2. WeakHashMap 

# 참고
[https://wiki.c2.com/?CanonicalizedMapping]
[https://www.baeldung.com/java-weak-reference]
[https://d2.naver.com/helloworld/329631]

