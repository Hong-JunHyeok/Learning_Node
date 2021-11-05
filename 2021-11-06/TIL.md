# Node의 코어

- ## 전역 객체(global, process)와 버퍼(Buffer)

  몇몇 개체는 Node앱에서 모듈을 포함시킬 필요도 없이 사용할 수 있다.
  이러한 항목들을 global이라는 설명 레이블로 분류하고 있다.

  - global 객체 : 전역 네임스페이스
  - process 객체 : STDIO스트림에 대한 래퍼와 같은 필수 기능과 동기 함수를 비동기 콜백으로 전환해주는 기능을 제공
  - Buffer 클래스 : 원시 데이터 저장 및 조작을 제공하는 전역 객체
  - 도메인 해석과 URL 처리에 유용한 모듈

  - ## Global

    브라우저의 window와 유사하다고 보면된다. 즉, 전역 속성 및 메서드에 대한 접근을 제공하고 이름으로 명시적인 참조를 할 필요가 없다.

    다만 window객체와 다른점은, window는 진정한 전역 객체다. 클라이언트 JS에서 전역 변수를 선언하면 웹 페이지와 모든 단일 라이브러리에서 접근이 가능하다.

    하지만 Node 모듈에서 최상위 영역에 변수를 생성하면 모듈에 대해서는 전역이 되지만 모든 모듈에 대해서는 아니다.

    RELP에서 모듈/전역 변수를 정의할 때 global 객체에서 어떤일이 벌어지는지 확인해보자.

    ![](https://images.velog.io/images/hjh040302/post/6ac6eca2-f67d-4f45-bb45-8ea8d6c8b64f/image.png)

    맨 아래 새로운 속성으로 변수가 추가됐다.
    이번에는 global을 변수에 할당하되, var 키워드를 사용하지 말아보자.

    ![](https://images.velog.io/images/hjh040302/post/6f5e1f2c-18a5-4bf2-a5b5-3578bd808c27/image.png)
    global이 콘솔에 출력되고 맨 아래에 해당 지역 변수가 순환참조로 할당된 것을 볼 수 있다.

    순환 참조는

    A.js를 export 시켜서 B.js에서 import 해서 모듈을 사용하고 있는데,
    B.js에서도 A.js를 import해서 사용하려고 하면, 무한 반복을 막기 위해서 의도적으로 빈 객체를 뱉어낸다.
    로 이해하면 편하다.

    require를 비롯한 다른 객체나 메서드들도 global객체의 인터페이스에 속한것이다.

    애플리케이션에서 사용자 정의 RELP를 생성하면 고유한 global객체를 가진 새로운 컨텍스트 내에 존재하게 된다. 만약, 이를 막을려면 useGlobal옵션을 false -> true로 설정해주면 된다.

    정리하자면 **모듈들은 자신만의 고유한 네임스페이스 내에 존재하므로 한 모듈 내에서 최상위 변수를 정의하면 다른 모듈에서는 해당 변수를 사용할 수 없다.**

    이는 JavaScript 개발자 입장에서 라이브러리 내의 전역 변수때문에 발생하는 예기치 못한 데이터 충돌 문제를 더 이상 겪지 않아도 되는 것을 의미한다.

  - ## Process

    각 Node 애플리케이션은 Node의 process 객체 인스턴스다.
    process객체의 메서드 및 속성 대부분은 애플리케이션 및 환경에 대한 식별과 정보를 제공한다.

    또한 STDIO 스트림도 래핑하고 있다. stdin과 stdout은 비동기적이며 각각 읽기와 쓰기가 가능하다.
    ![](https://images.velog.io/images/hjh040302/post/8a03dd34-a05f-4490-94b5-f00381e8202b/image.png)

    무언가를 입력한 후 엔터를 누를때 마다 입력한 내용이 그대로 되풀이된다.
    또한 유용한 메소드로는 memoryUsage가 있다. Node애플리케이션의 메모리 사용량을 보여준다.

    `{ rss: 32309248, heapTotal: 6717440, heapUsed: 4409224, external: 926092, arrayBuffers: 10083 }`

    heapTotal, heapUsed는 V8엔진의 메모리 사용량을 의미한다.

    마지막으로 nextTick이다. 이 메서드는 Node의 이벤트 루프 다음 틱(루프)에서 호출될 콜백함수를 연결해준다.

    ```js
    var asyncFunction = function (data, callback) {
      process.nextTick(function () {
        callback(data);
      });
    };
    ```

    이는 아래의 코드와 같다.

    ```js
    setTimeout(function () {
      callback(val);
    }, 0);
    ```

  - ## Buffer
