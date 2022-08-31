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
      validate:{
        isAlpha:{
          msg: "The hobbis must be an contain latters like this 'Dancing' ",
        },
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      validate:{
        isInt: {
          msg: "The user_id must be an contain integer ",
        },
      },
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
