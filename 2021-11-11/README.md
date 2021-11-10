# 템플릿 엔진

HTML은 정적 언어이다. 하지만 JS가 있으면 동적으로 동작한다.
템플릿 엔진은 JS를 이용해서 HTML을 쉽게 렌더링 할 수 있게 해주는 도구이다.

```js
//SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
```

views - 템플릿 파일들이 위치한 폴더
res.render 메서드가 이 폴더를 기준으로 템플릿 엔진을 찾아서 렌더링한다.

res.render('admin/main')이라면 views/admin/main.pug를 렌더링한다.

## Pug

Pug의 기본적인 문법은 <>가 아닌 탭으로 이루어져있다. 부모-자식관계는 공백으로 나눈다.

```pug
doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheet/style.css')
```

태그명 뒤에 소괄호로 묶어서 속성을 전달해준다.
클래스, 아이디는 다음과 같이 표현할 수 있다.

```pug
#id
.class
```

HTML텍스트는 태그 또는 속성 뒤에 한 칸을 띄고 입력하면 된다.

```pug
p Welcome to Express
```

위 코드는 다음과 같다.

```html
<p>Welcome to Express</p>
```

style을 적용하고 싶다면 다음과 같이 적어준다.

```pug
style.
    h1 {
        font-size: 14px;
    }
script.
    var message = 'pug';
    alert(message)
```

## 변수

PUG로 HTML에 변수를 렌더링할 수 있다.

```js
router.get("/", function (req, res, next) {
  // views/index.pug
  res.render("index", { title: "Express" });
});
```

혹은 다음과 같이 사용할 수 있다.

```js
router.get("/", function (req, res, next) {
  res.locals.title = "Express";
  res.render("index");
});
```

위의 코드는 템플릿 엔진이 locals객체를 읽어서 변수에 알아서 집어넣는다.
위 코드를 사용함으로써 다른 미들웨어도 locals객체에 접근할 수 있게된다.

전달받은 변수값을 템플릿 엔진에서 사용할려면 다음과 같이 작성하면 된다.

```pug
h1= title
p Welcome to #{title}
button(class=title, type='submit') 전송
input(placeholder=title + ' 연습')
```

변수를 텍스트로 사용할려면 태그 위에 "="을 사용해서 변수를 입력한다.
텍스트 중간에 사용할려면 "#{변수}"를 사용하면 된다.

pug 내부에서 "-"사용하면 자바스크립트 구문을 사용할 수 있다.

```pug
- var node = 'Node.js'
p= node
```

pug는 기본적으로 이스케이프를 하는데, 이를 하고싶지 않다면 !=를 사용하면 된다.

```pug
p= '<strong>Escape</strong>'
p!= '<strong>Escape</strong>'
```

반복문은 다음과 같이 사용된다.

```pug
ul
    each item in ['a','b','c']
        li= fruit
```

인덱스를 가져올 경우에는 다음과 같이 사용하면 된다.

```pug
ul
    each item, index in ['a','b','c']
        li= (index + 1) + '의 ' fruit
```

조건문은 if, else, else if 를 사용할 수 있다.

```pug
if isLoggedIn
    div 로그인 되었습니다.
else
    div 로그인이 필요합니다.
```

switch... case문도 가능하다.

```pug
case item
    when 'a'
        p= a
    when 'b'
        p= b
    when 'c'
        p= c
```

include기능으로 레이아웃을 재사용할 수 있다.

```pug
//- header.pug
header
    a(href='/') Home
    a(href='/aboout') About

//- footer.pug
footer
    div 푸터

//- main.pug
include header
main
    h1 메인
include footer
```

extends와 block기능을 이용해서 레이아웃도 지정할 수 있다.

```pug
//- header.pug
header
    a(href='/') Home
    a(href='/aboout') About

//- footer.pug
footer
    div 푸터

//- layout.pug
doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheet/style.css')
    body
        include header
        block content
        include footer

//- body.pug
extends layout

block content
    main
        p 메인입니다.
```

## EJS

pass;

# 에러 처리 미들웨어

```js
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
```

에러 핸들러는 다음과 같은 형태를 띄고있다.

- res.locals.message
- res.locals.error

템플릿 엔진은 다음 두 값을 읽어서 렌더링해준다.
또한 `req.app.get("env") === "development" ? err : {}`이 부분은 개발 모드일때는 에러의 내용을 보여주고 배포 모드일때는 에러의 로그를 보여주지 않는 로직이다.

app.get은 app.set했던 값을 가져오는 코드다.

```js
app.set("view engine", "pug");
app.get('view engine"); // -> pug
```

라우터에서는 app에 접근할려면 req.app.get을 하면 된다.
