# install 
```bash
brew update
brew install rabbitmq
brew info rabbitmq
```

# 서버 시작 
포어그라운드에서 시작:
```bash
CONF_ENV_FILE="/opt/homebrew/etc/rabbitmq/rabbitmq-env.conf" /opt/homebrew/opt/rabbitmq/sbin/rabbitmq-server
```

After starting a node, we recommend enabling all feature flags on it:
```bash
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