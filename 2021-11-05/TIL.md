# node 실행할 파일.js

Node명령어 다음에 애플리케이션을 백그라운드로 실행하게 해주는 &를 사용하지 않았기 때문에 애플리케이션이 시작된 후 명령줄로 반환되지 않는다.
취소하거나 Kill 시키기 전까지 계속 실행된다.

```console
node helloworld.js &
```

프로세스를 종료할려면, ps -ef를 사용해야 하고 kill을 사용하여 수동으로 해당 프로세스를 강종해야 한다.

```console
ps -ef | grep node
```

> MAC OS에서의 문제인지는 모르겠지만 위의 명령어를 치면 제대로 동작하지 않는것 같다.
> 그래서 다음 코드를 쓰면 해결된다

```console
lsof -i tcp:포트번호
```

```console
COMMAND   PID         USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    76322 hongjunhyeok   22u  IPv6 0x6b72100b3f999ed1      0t0  TCP *:8124 (LISTEN)
```

그러면 위 같이 뜨고, PID를 kill하면 된다.

```console
kill -9 76322
```

동일한 포트에서 대기하는 또 다른 Node애플리케이션을 시작할 수는 없다. (한 포트 - 한 애플리케이션)로 매핑된다.

# Hello, World 코드 살펴보기

```js
var http = require("http");
```

Node기능 대부분은 모듈이라고 불리는 외부 애플리케이션 및 라이브러리를 통해 제공된다. 앞의 코드는 HTTP모듈을 로드해서 로컬 변수에 할당한다.

```js
http.createServer(function (req, res) {...});
```

이 코드는 HTTP모듈의 `createServer`를 사용하여 새로운 서버를 생성했다.
함수 호출 매개변수로 익명함수가 전달된다. 이 익명함수는 requestListener 함수로 서버요청과 서버응답이라는 두 개의 매개변수를 가진다.

```js
res.writeHead(200, { "content-type": "text/plain" });
```

http.ServerResponse 객체는 writeHead라는 메서드를 가지는데, 응답 상태와 응답 content-type을 제공하는 응답 헤더를 전송하고 있다.
Headers객체 내에 content-length, connection과 같은 다른 응답 헤더 정보를 포함시킬 수 있다.

```js
res.end("Hello, World\n");
```

그 다음은 메시지를 쓰는 명령이다.
http.ServerResponse.end 메서드를 사용함으로써모든 헤더와 응답 본문이 전송되었고 통신이 종료되었다는 신호를 보낸다.
end 메서드는 `데이터 청크`, `인코딩`을 매개변수로 받는다.

```js
res.write("Hello, World\n");
res.end();
```

위의 코드는 앞서 쓴 코드와 동일하게 동작한다.

```js
.listen(8124);
```

이는 createServer메서드가 끝난 후에 연결되어 해당 포트로 들어오는 연결들을 대기한다.

listen메서드는 비동기인데, 연결이 맺어지기를 기다리는 동안, 프로그램 실행이 차단되지 않는다는 것을 의미한다. listen이후에 어떠한 코드가 처리되든 포트 연결이 맺어져서 listening이벤트가 발생하면 listen 콜백함수가 동작한다.
