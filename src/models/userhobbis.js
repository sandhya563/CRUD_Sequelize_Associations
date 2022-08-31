const { TEXT } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const User_Hobbis = sequelize.define("user_hobbis", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    hobbis: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
  User_Hobbis.associate = (models) => {
    User_Hobbis.hasMany(models.user_infos, {
      foreignKey: "user_id",
    });
    User_Hobbis.belongsTo(models.users, {
      foreignKey: "user_id",
    });
  };
  return User_Hobbis;
};
