### 타입스크립트에서 둘의 차이

```javascript
let http = require('http');
```

인텔리센스 동작안함
require는 commonjs의 모듈 방식

```typescript
import * as http from "http"
```

인텔리센스 동작함
import는 es6의 모듈방식. 바벨등으로 트랜스파일링이 필요하다.
