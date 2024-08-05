```typescript
async function listen() {
    // 커넥션 생성
    const mqConnection = await amqp.connect({
        hostname: 'localhost', port: 5672,
        username: 'admin', password: 'password'
    });

    // 채널 생성
    const channel = await mqConnection.createChannel();

    // exchange 정의
    const exchange = await channel.assertExchange('test.exchange', 'fanout', {
        durable: false
    })

    // queue 정의
    const queue = await channel.assertQueue('test.queue', {
        exclusive: true,
        durable: false,
    })

    // exchange에 queue 바인딩 
    channel.bindQueue(queue.queue, exchange.exchange, '');

    channel!.consume('test.queue', (message) => {
        console.log('RECEIVE' + queue.queue);

        if (message) {
            channel.ack(message);
        }
    })
}
listen();
```