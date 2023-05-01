"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Posts 모델과 1:N 관계 설정
      this.hasMany(models.Posts, {
        sourceKey: "userId",
        foreignKey: "UserId",
      });

      // Comments 모델과 1:N 관계 설정
      this.hasMany(models.Comments, {
        sourceKey: "userId",
        foreignKey: "UserId",
      });

      // Likes 모델과 1:N 관계 설정
      this.hasMany(models.Likes, {
        sourceKey: "userId",
        foreignKey: "UserId",
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
