# 2PC 프로토콜
분산시스템에서 여러 데이터베이스에 걸친 트랜젝션이 ACID를 유지하도록 보장한다.
코디네이터라는 특수객체를 필요로 한다. 코디네이터는 분산시스템내 독립된 서버(데이터베이스, 메세지큐)간의 동기화를 조정한다.
2PC는 준비단계, 커밋단계 두단계로 나뉜다.

# 준비단계
* 목적: 모든 참여 노드가 트랜잭션을 안전하게 커밋할 수 있는지 확인하는 과정. 각 노드는 데이터변경을 완료하고 커밋이 가능한지 자신의 상태 체크해 응답해야한다. 

# 커밋단계
성공 시: 모든 노드가 준비 단계를 통과하면, 코디네이터는 커밋을 지시하고 각 노드는 변경 사항을 영구적으로 적용한다. 락이 해제되고, 로그에 커밋이 기록되어 추후 복구 가능성을 보장한다.
실패 시: 준비 단계에서 하나라도 실패(Abort 응답)가 발생하면, 코디네이터는 모든 노드에 롤백을 지시하고, 각 노드는 변경 사항을 취소한다.
커밋 포인트 사이트: 특정 노드가 커밋의 시작점을 담당하며, 이 노드의 커밋 성공 여부가 전체 트랜잭션의 성공을 결정짓는 기준이 된다.

# 복구
내구성 보장: 2PC는 트랜잭션의 변경 사항을 안정적인 저장소(예: 디스크의 리도 로그)에 저장하여 시스템 장애 시 복구 가능성을 보장합니다.
실패와 복구: 한 노드가 실패하더라도, 준비 단계에서 저장된 로그를 통해 복구 후 트랜잭션을 완료할 수 있습니다. 이는 ACID의 지속성(Durability)을 충족하기 위함입니다.
트랜잭션 매니저: 코디네이터의 역할을 수행하며, 모든 리소스 매니저의 상태를 추적하고 2PC 프로토콜을 실행하여 일관성을 유지합니다.

# vs Saga

특징,2PC,Saga
목표,모든 노드가 동시에 커밋 또는 롤백하여 원자성 보장,"로컬 트랜잭션의 시퀀스로 일관성 유지, 비동기적 처리"
단계,준비 단계(Prepare) + 커밋 단계(Commit),각 단계별 로컬 트랜잭션 + 보상 트랜잭션
변경 가시성,"커밋 전까지 변경 사항 비공개, 커밋 후 일괄 반영","각 단계마다 즉시 커밋, 외부에 즉시 가시적"
적합한 사용 사례,즉각적인 트랜잭션 (예: 계좌 이체),장기 실행 트랜잭션 (예: 주문-결제-배송 워크플로우)
개발 복잡성,"트랜잭션 매니저가 대부분 처리, 개발자 부담 낮음","보상 트랜잭션 설계 필요, 개발자 부담 높음"
확장성,동기적 처리로 확장성 제한 (락과 네트워크 대기 시간 문제),"비동기적 처리로 확장성 우수, 마이크로서비스에 적합"
장애 처리,전체 롤백으로 일관성 보장,"보상 트랜잭션으로 실패 복구, 최종 일관성(Eventual Consistency) 목표"

2PC 예시
```java
@Stateless
public class TransferService {
    @Resource
    private UserTransaction utx;

    public void transfer(Account account1, Account account2, double amount) throws Exception {
        utx.begin();
        try {
            account1.withdraw(amount); // 계좌 1 출금
            account2.deposit(amount);  // 계좌 2 입금
            utx.commit();
        } catch (Exception e) {
            utx.rollback();
            throw e;
        }
    }
}
```

Saga 예시
```java
@Service
public class OrderSagaService {
    @Autowired
    private OrderService orderService;
    @Autowired
    private PaymentService paymentService;

    public void processOrder(Order order) {
        try {
            // 1. 주문 생성
            orderService.createOrder(order);
            // 2. 결제 처리
            paymentService.processPayment(order);
        } catch (Exception e) {
            // 보상 트랜잭션: 결제 실패 시 주문 취소
            orderService.cancelOrder(order);
            throw e;
        }
    }
}
```

Spring Cloud (이벤트 기반 Saga)
```java
@Service
public class OrderService {
    @Autowired
    private MessagePublisher messagePublisher;

    @Transactional
    public void createOrder(Order order) {
        // 주문 저장
        orderRepository.save(order);
        // 이벤트 발행
        messagePublisher.publish(new OrderCreatedEvent(order.getId()));
    }
}

@Service
public class PaymentService {
    @StreamListener("order-created")
    public void handleOrderCreated(OrderCreatedEvent event) {
        try {
            processPayment(event.getOrderId());
        } catch (Exception e) {
            // 보상 이벤트 발행
            messagePublisher.publish(new PaymentFailedEvent(event.getOrderId()));
        }
    }
}
```