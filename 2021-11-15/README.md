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
