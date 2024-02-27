프론트엔드
```javascript
const eventSource = new EventSource(`/subscribe`);

eventSource.onmessage = event => {
	const data = JSON.parse(event.data);
	console.log(data.message);
};
eventSource.onerror = error => {
	eventSource.close();
};
```

백엔드 
```java
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SSEServlet extends HttpServlet {
	public void subscribe(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	
		response.setContentType("text/event-stream");	// Header에 Content Type을 Event Stream으로 설정
		response.setCharacterEncoding("UTF-8");		// Header에 encoding을 UTF-8로 설정

		PrintWriter writer = response.getWriter();
		for(int i = 1; i <= 10; i++) {
			writer.write("data: { \"message\" : \"number : "+ i + "\" }\n\n");
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		writer.close();
	}
}
```