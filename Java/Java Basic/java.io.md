# 개요
1. Stream
    1. 바이트 기반 
    1. 입력 - InputStream
    1. 출력 - WriteStream
1. Reader, Writer
    1. 문자 기반 
    1. 입력 - Reader
    1. 출력 - Writer

# Level1 class
1. java.io.InputStream abstract class
1. java.io.OutputStream abstract class
1. java.io.Reader abstract class
1. java.io.Writer abstract class

# Level2 class
1. java.io.InputStreamReader class
    1. extends Reader
    1. 바이트 스트림과 문자 스트림을 이어주는 브릿지 
    1. 바이트를 읽어서 문자로 디코딩한다. 
    1. sun.nio.cs.StreamDecoder class 를 내부에서 사용
        1. extends Reader

# Level3 class
1. java.io.BufferedInputStream
    1. extends FilterInputStream
    1. 입력 소스로부터 자신의 내부 버퍼 크기만큼 데이터를 미리 읽고 버퍼에 저장한다.
    1. 생성자 매개값으로 준 입력 스트림과 연결되어 8918 내부 버퍼 사이즈를 가진다.
