# 데이터베이스란?

관련성을 가지고 중복이 없는 데이터들의 집합이다. 이러한 데이터의 집합을 관리하는 시스템을 DBMS라고 부른다.

서버에 데이터베이스를 올리게 되면 여러 사람들이 동시에 데이터를 사용할 수 있다.
이 데이터에 접근 권한을 줘서 각각 읽기, 쓰기, 읽기 & 쓰기 등의 작업을 가능하게 할 수 있다.

# MySql 사용해보기

## 데이터베이스 생성하기

CREATE SCHEMA [DB_NAME] => 데이터베이스를 생성하는 명령어
스키마는 DB랑 같은 개념이라고 생각하면 된다.

## 테이블 생성하기

테이블 => 데이터가 들어갈 수 있는 틀
테이블에 맞는 데이터만 들어갈 수 있다.

```sql
mysql> CREATE TABLE nodejs.users (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> name VARCHAR(20) NOT NULL,
    -> age INT UNSIGNED NOT NULL,
    -> married TINYINT NOT NULL,
    -> comment TEXT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> UNIQUE INDEX name_UNIQUE (name ASC))
    -> COMMENT = '사용자 정보'
    -> DEFAULT CHARSET=utf8
    -> ENGINE=InnoDB;
```

## 자주 쓰이는 자료형

- INT - 정수
- VARCHAR, CHAR -> VARCHAR는 가변길이, CHAT는 고정길이다. (VARCHAR(10)은 0 ~ 10자리 길이의 문자열만 넣을 수 있다. CHAR은 부족한 부분을 스페이스로 채운다.)
- TEXT - 긴 글을 저장할 때 씀.
- TINYINT - -127 ~ 128까지의 정수 (0과 1을 표현할 때 많이 씀)
- DATETIME - 날짜와 시간에 대한 정보를 담고있다. (DATE는 날짜 정보를 담는 자료형, TIME은 시간을 담는 자료형 DATETIME은 둘 다를 담는다.)

## 컬럼 옵션 확인하기

- NULL, NOT NULL - NULL값 허용 여부를 의미한다.
- AUTO_INCREMENT - 숫자를 자동으로 증가시킨다.
- UNSIGNED - 숫자 자료형에 적용된다. 음수를 무시하고 그만큼 양수를 더 사용할 수 있다.
- ZEROFILL - 나머지 자리값을 0으로 채운다.
- DEFAULT now() - 해당 컬럼에 값이 안들어왔을 때, MySql이 기본값으로 now()의 값을 넣어준다. (now()는 현재 시간을 넣어준다.)
- PRIMARY KEY는 기본 키인 경우에 사용된다. 로우를 대표하는 고유한 값이다. 기본키는 다른 값과 겹치지 않는 값을 사용해야 하며, 일종의 주민등록번호라고 볼 수 있다.
- UNIQUE INDEX - 해당 값이 고유해야 하는지에 대한 옵션이다.
- COMMENT - 테이블의 설명을 적는다. (옵셔널이다.)
- DEFAULT CHARSET - 인코딩 형식을 적는다.
- ENGINE - MyISAM혹은 InnoDB가 많이 쓰인다.

## 결과물

```sql
mysql> DESC nodejs.users;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| name       | varchar(20)  | NO   | UNI | NULL              |                   |
| age        | int unsigned | NO   |     | NULL              |                   |
| married    | tinyint      | NO   |     | NULL              |                   |
| comment    | text         | YES  |     | NULL              |                   |
| created_at | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
```

# 외례키 설정하기

```sql
CONSTRAINT [제약조건명] FOREIGN KEY [컬럼명] REFERENCES [참고하는 컬럼명]
```

외례키 ON 속성

```sql
ON DELETE CASCADE
```

레퍼런스의 값이 삭제되었을 때, 외례키의 로우 값도 삭제.

```sql
ON UPDATE CASCADE
```

레퍼런스의 값이 수정되었을 때, 외례키의 로우 값도 수정.

# CRUD

## 데이터 추가

```sql
-- 유저 정보 추가
INSERT INTO nodejs.users (name, age, married, comment) VALUES ('Hong', 18, 0, '저는 풀스택을 공부하고있는 개발자 홍준혁입니다.');

-- 댓글 추가
INSERT INTO nodejs.comments (commenter, comment) VALUES (1, '첫 댓글입니다.');
```

## 데이터 읽기

```sql
-- 모든 유저 조회
SELECT * FROM nodejs.users;

-- 모든 댓글 조회
SELECT * FROM nodejs.comments;
```

특정 컬럼을 조회하고 싶을 때에는 조회를 원하는 컬럼을 SELECT 다음에 넣어주면 된다.

```sql
-- 모든 유저의 name과 comment컬럼을 가져옴
SELECT name, comment FROM nodejs.users;
```

WHERE문으로 특정 조건을 충족하는 데이터만 가져오게 할 수도 있다.

```sql
-- 결혼도 했고 나이가 20살 초과인 사람을 가져옴
SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 20;
```

AND는 모두 다 충족 할때의 로우를 가지고 오는데,
OR을 쓰면 둘 중 하나라도 충족할 때 가져온다.

```sql
-- 결혼을 했거나 나이가 10 초과인 사람을 가져옴
SELECT name, age FROM nodejs.users WHERE married = 1 OR age > 10;
```

ORDER BY [컬럼명] [ASC | DESC]로 데이터를 정렬할 수 있다.

```sql
-- 나이가 많은 순으로 정렬
SELECT name, age FROM nodejs.users ORDER BY age DESC;
```

조회할 로우의 개수도 지정할 수 있다.

```sql
SELECT name, age FROM nodejs.users ORDER BY age DESC LIMIT 1;
```

LIMIT로 첫 한개의 값만 가져오는 것도 가능하다.

몇 개를 건너뛸지 설정도 가능하다.

```sql
SELECT name, age FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;
```

OFFSET [건너뛸 숫자] - 만약 페이지네이션을 한다면 유용한 기능이다.

## 데이터 수정

```sql
 UPDATE nodejs.users SET comment='수정된 내용입니다.' WHERE id=1;
```

UPDATE [테이블 명] SET [컬럼명=바꿀내용] WHERE [조건]

## 데이터 삭제

```sql
DELETE FROM nodejs.users WHERE id=2;
```
