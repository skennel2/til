websocket은 브라우저에서 소켓통신을 하는 기술 자체이고 socket.io는 소켓통신에 대해 추상화된 라이브러리이다.
socket.io는 실제 통신에 websocket을 이용할 수도 있고, websocket을 사용할 수 없는 브라우져 환경에서는 롱풀링을 이용하는 식으로 동작한다.