# 동기와 비동기, 블로킹과 논 블로킹

- 동기와 비동기 : 백그라운드 작업 완료 확인 여부
- 블로킹과 논블로킹 : 함수가 바로 return 되는지 여부

노드는 동기-블로킹 방식과 비동기-논블로킬 방식이 대부분이다.

동기-블로킹 방식은 백그라운드 작업 완료 여부를 계속 확인하며 호출한 함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return된다.
비동기-논블로킹 방식은 호출한 함수가 바로 return되어 다음 작업으로 넘어가며 백그라운드 작업 완료 여부는 신경쓰지 않고 나중에 백그라운드가 알림을 줄 때(이벤트 루프) 처리한다.

# Node 모듈 시스템

기존의 브라우저에서의 자바스크립트는 코드를 모듈로 만들 수 없었다. 모듈이란 특정한 기능을 하는 함수나 변수들의 집합인데, 모듈을 만들어 놓으면 여러 프로그램에 해당 모듈을 재사용할 수 있어서 좋다.

서버사이드에서 실행되는 Node에서는 모듈 시스템이 필요하기 때문에 require/exports로 지원을 한다.

2015년 이후, 브라우저에서도 import/export의 모듈 개념이 도입되면서 앞으로 더 많은 브라우저가 모듈 시스템을 지원할 것으로 보인다.

# 서버란 무엇인가?

Node.js로 서버 애플리케이션을 구축할 수 있다.
서버는 네트워크를 통해서 클라이언트에 데이터, 서비스를 제공하는 컴퓨터 프로그램을 의미한다.

즉, 서버는 모바일, 웹, 윈도우 등에서 응답을 보내는 프로그램이다.
HTML을 어디서 받아올까?

1. 서버에 주소를 입력(요청)
2. 브라우저는 입력받은 주소에 해당하는 컴퓨터의 위치를 파악한다.
3. 서버에서는 클라이언트를 빌드하기 위한 HTML,CSS,JS,이미지 등을 보내준다.
4. 사용자의 브라우저에 정상적으로 화면이 뜬다.

# 왜 굳이 Node로 서버를 만드는 걸까?

노드는 자바스크립트의 런타임이다.
런타임이라는 것은 특정 언어로 만든 프로그램들을 실행할 수 있는 환경을 뜻한다,
`노드 === JS실행기`

크롬의 V8엔진 기반으로 만들어진 Node.js는 굉장히 빠른 속도로 데이터를 처리하는 장점이 있어서 많은 개발자들이 서버를 만들때 Node.js 런타임을 이용해서 만든다.

Node.js의 구성요소
![image](https://thebook.io/img/080229/027_1.jpg)

libuv 라이브러리는 노드의 특성인 이벤트 기반, 논 블로킹 I/O 모델을 구현하고 있다.

# 이벤트 기반(event-driven)?

이벤트가 발생할 때 미리 저장해둔 작업을 수행하는 방식을 의미한다.
`ex) 클릭 이벤트, 서버 데이터 요청`

이벤트 기반 시스템에서는 특정 이벤트가 발생할 때 무엇을 할지 등록을 해놔야한다.

> 이벤트 리스너(event listener)에 콜백(callback) 함수를 등록

`ex) 버튼을 클릭 -> Event Listener에 전달된 Callback함수 실행`

이때 이벤트 루프라는 개념이 등장하게 되는데, 여러 이벤트가 동시에 실행됐을때, 어떤 순서로 콜백을 실행할지 이벤트루프가 정해준다.

# Event

- on() : 이벤트 발생 시 콜백과 연결시킨다. (중복 가능)
- addListener() : on메서드와 같다. (단, 중복시 오버라이딩)
- emit() : 이벤트를 발생시키는 메서드
- once( ) : 이벤트를 한번만 발생하도록 만드는 것
- removeAllListeners() : 해당 이벤트에 연결된 리스너들을 제거한다.
- removeListener() : 이벤트와 리스너를 전달받아서 해당 리스너를 제거한다.
- listenerCount() : 해당 이벤트의 리스너 개수를 리턴한다.

# setTimeout !== JavaScript Function

그 이유는 setTimeout은 백그라운드이기 때문이다.
백그라운드라는 공간에서 setTimeout, 이벤트 리스너같은 함수들이 대기하고, 자바스크립트가 아닌 다른 언어로 만든 기능으로 봐도 부방하다.

JS의 실행 과정을 잘 나타내는 그림
![image](https://thebook.io/img/080229/030.jpg)

태스크 큐의 콜백이 있는 동안, 뒤에있는 콜백들은 잠시 밀려나기 때문에 setTimeout의 시간이 정확하지 않는 이유다.

# 논 블로킹 I/O

이벤트루프를 잘 이해하면 오래 걸리는 작업들을 효율적으로 처리할 수 있다. 작업에는 동시에 실행할 수 있는 작업과 동시에 실행할 수 없는 작업이 있다.

기본적으로 JS는 싱글쓰레드언어이기 때문에 동시에 실행될 수 없다. 하지만 I/O같은 작업은 동시에 실행될 수 있다.

논 블로킹이란, 작업을 완료할 때까지 기다리지 않고 다른 작업을 수행하는 것이고, 블로킹은 이전 작업이 다 끝나야만 실행하는 것이다.

Node가 I/O작업을 백그라운드에 넘기기 때문에 동시에 처리할 수 있는것이다.

# 블로킹 코드 작성해보기

```js
function longTask() {
  console.log("작업 끝");
}

console.log("시작");
longTask();
console.log("끝");
```

```
결과 >

시작
작업 끝
다음 작업
```

# 논 블로킹 코드 작성해보기

```js
function longTask() {
  console.log("작업 끝");
}

console.log("시작");
setTimeout(longTask, 0);
console.log("끝");
```

```
결과 >

시작
다음 작업
작업 끝
```

setTimeout이라는 기능을 통해 백그라운드에 위임했으므로 다음 작업을 진행하고 longTask를 진행하는 코드를 작성할 수 있다.

이벤트 드리븐을 잘 이애한다면 이해가 되는 코드다.

# 무조건 논 블로킹 코드가 좋은걸까?

아무리 논 블로킹 방식으로 코드를 작성하더라도 우리가 작성한 코드는 전체 소요 시간이 짧아지지는 않는다.

우리가 작성한 코드는 동시에 실행되지 않기때문이다.
그런데 왜 쓰는걸까?

오래 걸리는 작업을 하는 경우에는 실행 순서를 바꿔주는 작업을 통해서 간단한 작업들이 밀려나는 현상을 방지할 수 있다.

**논 블로킹 !== 동시 실행**
동시 실행은 논 블로킹과 같은 개념이 아니다.
동시성은 동시 처리가 가능한 작업을 논 블로킹 처리해야 얻을 수 있다.

# 싱글 쓰레드?

싱글 쓰레드는 말 그대로 쓰레드가 하나뿐인 것을 의미한다.
자바스크립트 코드는 싱글 쓰레드이므로 코드가 동시에 실행되지 않는다.

쓰레드를 이해하기 위해서는 프로세스를 이해하여야 한다.

- 프로세스는 운영체제에서 할당하는 작업의 단위이다. 노드나 웹 브라우저 같은 프로그램을 개별적인 프로세스다. (프로세스 간에는 메모리 등의 자원을 공유하지 않는다.)
- 쓰레드는 프로세스 내에서 실행되는 흐름의 단위이다. 프로세스는 쓰레드를 여러 개 생성해 여러 작업을 동시에 처리할 수 있다. (쓰레드는 부모 프로세스의 자원을 공유한다. 같은 주소의 메모리에 접근하므로 데이터를 공유할 수 있다.)

노드는 싱글 쓰레드 언어이다. 하지만 엄밀히 말하면 싱글 쓰레드로 동작하지 않는다.
노드를 실행하면 프로세스가 하나 생성되고 프로세스에서 쓰레드들을 생성하는데, 그 중에서 직접 제어할 수 있는 쓰레드는 하나뿐이다. 그래서 노드가 싱글 쓰레드라고 하는것이다.

쓰레드가 하나라는 의미는 일손이 하나라는 의미이다. 요청이 들어오면 한번에 하나씩 요청을 처리한다. 그래서 많은 작업량이 들어오게되면 블로킹이 발생하는 경우가 있는데 이럴때는 논 블로킹 방식으로 대기 시간을 줄이는게 효과적이다.

# Node로서 서버

I/O의 작업이 많은 서버일수록 싱글 쓰레드, 논 블로킹 모델인 Node.js서버가 빛을 발한다.
하지만 CPU작업이 많은 이미지, 비디오 처리, 대규모 데이터 처리같은 작업은 Node.js가 부화가 걸릴 수도 있다.

C, C++, Rust, Go같은 언어로 처리하는 것이 더욱 효율적이기 때문에 굳이 노드로 CPU에 무리가 가는 작업을 하고싶으면 AWS Lamda, Google Cloud Functions같은 서비스를 이용하는 게 좋다.

기본적으로 싱글 쓰레드는 멀티 쓰레드 방식보다 프로그래밍 하기 쉬으므로 입문할 때 많이 Node.js를 한다. 다만, 하나뿐인 쓰레드가 죽어버리면 서버가 멈추기때문에 에러 핸들링을 잘 해야한다.

사실, Node가 서버로써의 기능은 좋다고 볼 수 없다. 그렇긴 해도 극단적인 성능이 필요한 경우가 아니라면 노드의 생상성으로 극복 가능하다

# 서버 외의 Node

웹, 모바일, 데스크톱 애플리케이션 개발에도 사용되기 시작했다.
React, Angular, Vue 등등의 웹 프레임워크가 Node기반으로 돌아간다. Electron으로 데스크톱 개발을 할 수 있다.

# 노드에서 this란?

다른 부분은 브라우저에서의 JS랑 동일하지만 최상위 스코프에 존재하는 this는 module.exports를 의미한다.
함수 선언문 내에서의 this는 global객체를 가리킨다.

require나 exports는 아무데서나 사용해도 된다.
require.cache객체에는 각 파일의 모듈 객체가 들어가있다.
한번 require한 파일은 cache에 저장되므로 다음번에 사용할때는 cache에 있는 것이 재사용되는 것이다.

require.main은 노드 실행 시 첫 모듈을 가리킨다.
즉, 현재 파일이 첫 모듈인지 알아볼려면 require.main === module을 실행하면 된다.
또한, 첫 모듈의 이름을 알아보려면 require.main.filename으로 확인하면 된다.

# Process

현재 실행되고 있는 노드 프로세스에 대한 정보를 담고있다.

# OS 모듈

노드는 OS 모듈에 운영체제의 정보가 있어서 가져올 수 있다.

```console
> os.arch();
'arm64'
> os.platform();
'darwin'
> os.type();
'Darwin'
> os.uptime();
1228442
> os.hostname();
'hongjunhyeog-ui-MacBookPro.local'
> os.release();
'20.5.0'
> os.homedir();
'/Users/hongjunhyeok'
> os.tmpdir();
'/var/folders/hg/qnl3v2650lbcw0z_tsvvlv080000gn/T'
> os.cpus();
[
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 77712000, nice: 0, sys: 58963820, idle: 407816550, irq: 0 }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 70205920, nice: 0, sys: 53699490, idle: 420550410, irq: 0 }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 62483240, nice: 0, sys: 47985530, idle: 433987290, irq: 0 }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 56711500, nice: 0, sys: 43944230, idle: 443799520, irq: 0 }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: {
      user: 262664800,
      nice: 0,
      sys: 48644390,
      idle: 233146140,
      irq: 0
    }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 49711300, nice: 0, sys: 16785310, idle: 477958820, irq: 0 }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 32098440, nice: 0, sys: 8291520, idle: 504065560, irq: 0 }
  },
  {
    model: 'Apple M1',
    speed: 24,
    times: { user: 26712100, nice: 0, sys: 6059280, idle: 511683610, irq: 0 }
  }
]
> os.freemem();
146735104
> os.totalmem();
17179869184
```

# Path 모듈

폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈

ex) 운영체제별로 경로 구분자가 다르기때문.

```js
const { isAbsolute } = require("path");
const path = require("path");

const string = __filename;

console.log(path.sep);
console.log(path.delimiter);
console.log(__dirname);
console.log(path.dirname(string));
console.log(path.extname(string));
console.log(path.basename(string, path.extname(string)));
console.log(path.parse(string));
console.log(
  path.format({
    base: "os.js",
    dir: "/Users/hongjunhyeok/Documents/GitHub/Learning_Node/2021-11-08",
    ext: ".js",
    name: "os",
    root: "/",
  })
);
console.log(isAbsolute("C:\\"));
console.log(isAbsolute("./class.js"));
console.log(path.normalize("C://users\\\\zerocho\\path.js"));
```
