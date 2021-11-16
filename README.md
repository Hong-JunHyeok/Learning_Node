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
- [2021-11-11](./2021-11-11/README.md)
- [2021-11-12](./2021-11-12/README.md)
- [2021-11-15](./2021-11-15/README.md)
- [SNS-service](./SNS-service/README.md)

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

# 웹 API서버

API서버는 프론트엔드와 분리되어 운영된다.
API란 Application Programming Interface의 약어다.
애플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 허용하는 접점을 의미한다.

웹 API는 다른 웹 서비스의 기능을 사용하거나 자원을 가져올 수 있는 창구이다.
API를 만들었다는 의미는 다른 프로그램에서 현재 기능을 사용할 수 있게 허용하였음을 의미한다.

서버에 API를 올려서 URL을 통해 접근할 수 있게 만든것을 웹 API서버라고 한다.

웹 서비스를 만들 때 공개해도 되는 정보들은 API로 만들어 API를 통해서 가져가게 하는것이 좋다. (API가 없을 경우에는 크롤링같은 기법으로 데이터를 발췌해야 하는데, 이는 트래픽 증가의 원인이된다.)

# 시퀄라이즈로 테이블간 관계 지정하기

## 1 : N

1 : N 관계에서는 hasMany와 belongsTo로 연결한다.
이때 1이 hasMany, N이 belongsTo이다.
그러면 시퀄라이즈는 N인 테이블에 1인 테이블의 primary key 컬럼을 추가해준다.

대표적인 예시가 User 테이블과 Post 테이블이 있는데, User가 1, Post가 N으로 관계가 형성된다.
Post테이블에는 userId컬럼이 추가된다.

## N : M

N : M의 관계는 belongsToMany메서드로 정의한다.
관계 특성상 중간 테이블이 필요하다. through 속성에 테이블의 명을 명시하면 된다.
대표적인 예시는 Post, Hashtag가 있다. 게시글은 여러 해시테그를 가질 수 있고, 해시테그는 여러 게시글을 가질 수 있다.

새로 생성된 중간 테이블에서는 N의 기본키, N의 기본키가 저장된다.

같은 테이블끼리의 N : M관계를 가질 수 있다. 대표적으로 팔로잉, 팔로워가 있다.
사용자 한 명이 팔로워를 여러 명 가질수도 있고, 여러 명을 팔로잉할 수도 있다.

같은 테이블간의 N : M 관계에서는 모델 이름과 컬럼이름을 따로 정해줘야 한다.
그렇지 않으면 같은 테이블의 이름이 중복된 중간 테이블이 생성되기 때문이다.
만약 Follow라는 중간 테이블을 생성한다고 했을때 followerId, followingId 두 개의 컬럼이 존재해야 한다.
