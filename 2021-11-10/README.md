# NPM이란?

다른 사람들이 작성해놓은 코드나 모듈을 APP Store처럼 공유해서 다운받아서 내 코드에 적용해 볼수도 있고 내 코드를 다른 사람들에게 공유해 놓을수도 있다.

npm은 Node Package Manager의 약어이다.

> yarn은 npm의 대체자이다.
> npm보다 쉽고 빠른 속도로 많은 사랑을 받고 있다.

# package.json으로 패키지 관리하기

노드에 패키지를 여러개 추가하다 보면 몇백개를 넘어가는 상황이 발생한다. 또한, 각 패키지는 버전이 있으므로 이를 기록해놓는 어딘가가 필요하다. 그것이 package.json이다.

프로젝트를 시작하기 전에 package.json파일을 만들고 시작하는 것이 좋다.

```console
npm init
```

--save 옵션은 npm@5부터는 기본값이므로 지정해줄 필요가 없다.

```console
npm install (--save) [Module_Name]
```

package-lock.json은 설치한 해당 모듈 외에도 node_modules에 들어있는 패키지들의 정보가 담겨있다. npm으로 패키지를 설치, 수정, 삭제할 때마다 내부 의존 관계를 이 파일에 저장한다.

--save-dev옵션은 개발용 모듈을 설치할 때 사용한다. 이는 devDependancies에 저장된다.

--global옵션은 적역적으로 설치하는 커맨드다. 환경 변수에 지정되므로 콘솔의 커맨드로 사용할 수 있게된다.

**npx 명령어**
전역 설치를 기피하는 경우가 있는데, package.json에 기록되지 않아 다시 설치할 때 어려움이 있기 때문에 npx라는 명령어를 사용한다.

# express-generator로 프로젝트를 생성할 때 폴더구조

bin > www => 서버를 실행하는 스크립트
public => 외부에서 접근 가능한 파일들을 모아놓은 폴더 (image, css, js등...)
routes => 주소별 라우터들을 모아놓은 곳
views => 템플릿 파일을 모아둔 곳

## MVC 패턴이란?

모델 - 뷰 - 컨트롤러 패턴의 줄임말이다.
Express에서 모델은 데이터 부분 뷰는 템플릿, 마지막으로 컨트롤러는 라우터라고 생각하면 된다.

# Express 구조 이해하기
