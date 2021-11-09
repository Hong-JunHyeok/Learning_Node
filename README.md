# Learning_Node

🐹 Node.js 🐹

> Node.js의 매력은 뭘까? 예전 C++개발자의 저유뮬처럼 생각되었던 고성능 서버 프로그램 개발의 문턱을 획기적으로 낮추었다.
> 그 외에 NPM을 통해 다운로드할 수 있는 다양한 모듈들 덕분에 짧은 시간 빨리 성장할 수 있었다.

# 목차

- [2021-11-05](./2021-11-05/README.md)
- [2021-11-06](./2021-11-06/README.md)
- [2021-11-08](./2021-11-08/README.md)
- [2021-11-09](./2021-11-09/README.md)
- [2021-11-10](./2021-11-10/README.md)

# 평범한 자바스크립트가 아니다.

- Node가 클라이언트 개발 시에 사용했던 것과 거의 동일한 자바스크립트를 기반으로 한다.
- Node는 서버 기술이므로, 브라우저 환경에서 예상할 수 있는 일부 기능과 안전창치가 Node에는 존재하지 않는데다 완전히 새롭고 생소한 기능들도 존재한다.

# 왜 Node인가?

Node는 입출력은 많지만 연산은 간단한 에플리케이션에서 사용되도록 설계되었다.
더욱 중요한 점은 이러한 기능을 바로 직접 제공한다는 것이다.

애플리케이션이 파일 로드가 완료되거나 데이터베이스가 업데이트될 때까지 다른 처리를 차단하는 것에 대해 염려한 필요가 없는데, 대부분의 기능들이 기본적으로 비동기이기 때문이다.(블로킹 현상을 막아준다.) Node는 단일 쓰레드로 구현되므로 쓰레드를 다루는 것에 대해서도 걱정할 필요가 없다.

**비동기 처리란?**

> 애플리케이션이 코드의 다음 단계로 진행하기 전에 입력/출력 프로세스를 기다리지 않는 것을 의미한다.
> 특정 이벤트를 기다리고 있다가 해당 이벤트가 발생하면 적절하게 응답한다.
> Node는 이벤트 기능이 완료되는 것을 기다리는 동안 다른 요청이 들어오는 것을 차단하지 않으며, 이벤트는 비교적 간단한 이벤트 루프 내에서 들어온 순서대로 처리된다.
