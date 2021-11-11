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
