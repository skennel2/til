## 개념
클라이언트 사이드의 상태와 서버데이터의 구분을 위한 라이브러리  
서버 데이터를 가져오는 비동기작업을 쉽게해준다

## QueryClient
```jsx
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient} >
    </QueryClientProvider>
```