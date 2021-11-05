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

# 비동기 함수와 Node 이벤트 루프

Node 애플리케이션을 시작하면 실행을 위해 단일 쓰레드를 생성하고 애플리케이션이 요청을 처리할 준비가 될 때까지 기다린다.
Node가 요청을 받으면 현재 요청에 대한 코드 처리가 완료될 때까지는 다른 요청일 처리될 수 없다. (동기적인 처리)
비효율적인거처럼 보이지만, **이벤트 루프와 콜백 함수를 이용한다면 비동기적으로 동작한다.**

이벤트 루프 - 특정 이벤트를 기본적으로 폴링하면서 적절하게 이벤트 핸들러(콜백 함수)를 호출하는 기능

만약 다섯 명이 동시에 Node 애플리케이션에 접근하고 애플리케이션이 파일 리소스에 접근해야 할 경우에는 Node는 각 요청에 대한 응답 이벤트에 콜백 함수를 연결시킨다.
각 요청에 대한 리소스가 사용 가능해지면 콜백 함수가 호출되어 요청 순서대로 처리된다.

# 비동기로 파일 읽기

```js
// http 모듈 로드
var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    // helloworld.js를 열고 읽음.
    // __dirname은 현재 경로를 의미한다.
    fs.readFile(__dirname + "/helloworld.js", "UTF-8", function (error, data) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      if (error) {
        res.write("Could not find or open for reading\n");
      } else {
        res.write(data);
      }
      res.end();
    });
  })
  .listen(8124, function () {
    console.log("bound to port 8124");
  });
console.log("Server is running on 8124");
```

위 예제에서는 fs가 사용되었다.
FileSystem은 파일 내용을 열고 접근하는 것을 비록한 표준 POSIX파일 기능을 래핑한 것이다.
인코딩을 제대로 안하면 파일 형식이 깨져서 나오므로 주의하도록 하자.

여기서 비동기 동작의 두 가지 예시는 readFile의 콜백과 listen의 콜백으로 볼 수 있다.

# 비동기 프로그램 흐름 살펴보기

JS로 개발하는 대부분의 사람들은 클라이언트 애플리케이션에서처럼 한 브라우저 내에서 한 번에 한 명만 실행을 한다고 생각한다.
서버에서 JS를 사용하는 것은 이상해 보인다. 여러 명이 동시에 접근하는 JS애플리케이션을 만드는 것은 더욱 더 이상하게 느낀다.
