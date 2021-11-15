# Sequelize로 모델 작성하기

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
```

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "comment",
    {
      comment: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
```

시퀄라이즈는 기본적으로 id를 기본 키로 연결하므로 id컬럼은 적어줄 필요가 없다.
각 DataType들은 sequelize공식 문서를 보면 자세히 나와있다.
[공식문서 링크](https://sequelize.org/master/manual/model-basics.html) (Data Types부분에 명시되어있음.)

timestamps옵션이 true면 createdAt, updatedAt 컬럼을 자동으로 추가해준다.
다음, models/index.js에 간 다음 다음과 같이 작성해서 db객체에 모델을 담아준다.

```js
db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
```

이제 MySql에 접근할 수 있도록 config를 해준다.

# 테이블과의 관계 정의하기

user테이블과 comment테이블의 관계는 1 : N 관계이다.
사용자 한 명은 댓글을 여러개 작성할 수 있는 반면에 댓글은 한 사용자만 달 수 있기 때문이다.

사용자와 사용자에 대한 정보 테이블은 1 : 1관계라고 볼 수 있다.

게시글과 해시테그와의 관계는 N : N 관계라고 볼 수 있다.

MySql은 관계형 데이터베이스이기 때문에 이러한 관계를 잘 작성하는게 중요하다.
JOIN이라는 기능으로 테이블관의 관계를 파악해서 결과를 도출한다.
시퀄라이즈는 JOIN기능을 해주는 대신, 관계를 명확히 정의해야한다.

```js
db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
// 1 : N 관계를 명시하는 코드
```

User 모델에 id를 소스키로 설정하고, Comment 모델에서 User의 소스키를 타겟키로 설정함으로서 commenter를 User의 id로 설정한 것이다.
만들어진 Comment테이블을 보면
![](https://images.velog.io/images/hjh040302/post/2ff3f7ec-0b3c-4ea0-bdb9-6b0d195ea345/image.png)
정상적으로 외래키가 잘 설정되었다.

# 시퀄라이즈 쿼리 사용해보기

## 데이터 추가

```js
const { User } = require("../models");
User.create({
  name: "Hong",
  age: 18,
  married: false,
  comment: "안녕하세요",
});
```

모델을 불러와서 create 메서드를 사용하면 된다.
이때, 시퀄라이즈가 SQL자료형에 맞게 변환해준다.

## 모든 데이터 조회

```js
User.findAll({});
```

## 데이터 하나만 가져오기

```js
User.findOne({});
```

## attributes로 원하는 컬럼만 가져오기

```js
User.findAll({
  attributes: ["name", "married"],
});
```

## where 문으로 특정 조건의 데이터만 가져오기

```js
const {
  User,
  Sequelize: { Op },
} = require("../model");

User.findAll({
  attributes: ["name", "married"],
  where: {
    married: 1,
    age: { [Op.gt]: 30 },
  },
});
```

age부분은 computed property를 사용한 문법이다.

- Op.gt : 초과
- Op.gte : 이상
- Op.lt : 미만
- Op.lte : 이하
- Op.ne : 같지 않음
- Op.or : 또는
- Op.in : 배열 요소 중 하나
- Op.notIn: 배열 요소와 모두 다름

등의 연산자가 있다.

추가로 or문을 사용하는 예제를 보도록 하자.

```js
const {
  User,
  Sequelize: { Op },
} = require("../model");

User.findAll({
  attributes: ["id", "name"],
  where: {
    [Op.or]: [{ married: 0 }, { age: { [Op.gt]: 30 } }],
    // 미혼이거나, 나이가 30 초과인 경우 데이터를 가져옴.
  },
});
```

시퀄라이즈로 정렬된 데이터를 조회하는 방법이다.

```js
User.findAll({
  attributes: ["id", "name"],
  order: [["age", "DESC"]],
});
```

order이 왜 이중배열로 이루어져 있냐면 여러 컬럼에 정열 값을 줄 수 있기 때문이다.

## update 메서드로 로우 수정하기

```js
User.update(
  {
    comment: "수정된 내용",
  },
  {
    where: { id: 2 },
  }
);
```

첫 번째 인자는 수정할 내용, 두 번째 인자는 수정 대상 로우를 찾는 조건이다.

## destroy 메서드로 로우 삭제하기

```js
User.destroy({
  where: { id: 2 },
});
```
