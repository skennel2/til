# 기본개념 
1. 개념
    1. 익스체인지
        1. 프로듀서로부터 전송받은 메세지를 적절한 큐로 라우팅한다.
    1. 큐
        1. 메세지를 저장하고 소비자에게 전달되기전 대기하는 대기열이다. 
    1. 바인딩
        1. Exchange와 Queue를 연결하는 라우팅규칙을 정의힌다.        
    1. 프로듀서  
        1. 메세지를 생산해 RabbitMQ에 전송하는 주체        
    1. 콘슈머
        1. 큐로부터 메세지를 수신받아 처리한다. 
    1. 커넥션
        1. 애플리케이션과 RabbitMQ 브로커 간의 물리적 연결
    1. 채널
        1. 동일한 Connection 내에서 다수의 논리적 통신 스트림을 지원. 
        1. 대부분의 RabbitMQ 작업은 채널을 통해 이루어지며, 이를 통해 하나의 연결에서 다수의 메시징 작업을 처리할 수 있다.
    1.  Ack
        1. 메시지가 성공적으로 처리되었음을 RabbitMQ에 알리는 신호. RabbitMQ는 ack 신호를 받기 전까지 메시지를 큐에 유지

## 익스체인지 
1. 생산자는 큐에 다이렉트로 메세지를 보내지않는다. 생산자는 보통 어떤 큐가 메세지를 받을지 알지 못하고 관심도 없다.
1. 큐에 다이렉트로 메세지를 보내는 대신 생산자는 익스체인지에 메세지를 보낸다.
1. 익스체인지는 한쪽으로는 프로듀서로부터 메세지를 받고 한쪽으로는 큐로 메세지를 밀어넣는다.
1. 익스체인지는 메세지가 어떻게 처리되어야하는지 명확히 알고있다. (하나의 큐로 보낼지, 여러큐로 보낼지, 버릴지등)
1. 이러한 규칙은 익스체인지의 타입에 따라 구분된다. 
    1. direct
    1. fanout: 알고있는 모든 큐에 브로드캐스트한다.
    1. 

---

# install (MAC OS)
```bash
brew update
brew install rabbitmq
brew info rabbitmq
```

# 서버 시작 
포어그라운드에서 시작:
```bash
CONF_ENV_FILE="/opt/homebrew/etc/rabbitmq/rabbitmq-env.conf" /opt/homebrew/opt/rabbitmq/sbin/rabbitmq-server

# highly recommended: enable all feature flags on the running node
/opt/homebrew/sbin/rabbitmqctl enable_feature_flag all
```

백그라운드에서 시작:
```bash
# starts a local RabbitMQ node
brew services start rabbitmq

# highly recommended: enable all feature flags on the running node
/opt/homebrew/sbin/rabbitmqctl enable_feature_flag all
```

서버중지:
```bash
# stops the locally running RabbitMQ node
brew services stop rabbitmq
```

# 매니저 접속
http://localhost:15672/

# 계정 생성
```bash
# 사용자 이름이 admin이고 비밀번호가 password인 계정을 생성
rabbitmqctl add_user admin password
# 사용자 admin에게 관리자 권한을 부여
rabbitmqctl set_user_tags admin administrator
# 사용자 admin에게 모든 권한을 부여
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

# javascript로 연결테스트 
```bash
npm install amqplib 
npm install --save-dev @types/amqplib  
```

```typescript
var mqConnection: amqp.Connection | null = null;
var mqChannel: amqp.Channel | null = null;

async function connectToRabbitMq() {
    mqConnection = await amqp.connect('amqp://localhost:5672');
    mqChannel = await mqConnection.createChannel();
    mqChannel.assertQueue('TEST_Q', {
        durable: false
    })

    mqChannel!.sendToQueue('TEST_Q', Buffer.from("hello"));

    mqChannel!.consume('TEST_Q', (message) => {
        console.log(message);
        if (message) {
            mqChannel.ack(message);
        }
    })    
}
connectToRabbitMq();

```