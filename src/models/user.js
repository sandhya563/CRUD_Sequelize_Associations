module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_name: {
      type: Sequelize.STRING,
      validate: {
        isAlpha: {
          msg: "The user_name must be an contain latters like this 'Sandhya' ",
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
  User.associate = (models) => {
    User.hasOne(models.user_infos, {
      foreignKey: "user_id",
    });
    User.hasOne(models.user_hobbis, {
      foreignKey: "user_id",
    });
  };

  return User;
};
