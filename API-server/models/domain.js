module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "domain",
    {
      host: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      validate: {
        unknownType() {
          if (this.type !== "free" && this.type !== "premium") {
            throw new Error(`Type 컬럼은 free나 premium이여야 합니다.`);
          }
        },
      },
      timestamps: true,
      paranoid: true,
    }
  );
