
module.exports = (sequelize, Sequelize) => {
  const User_Info = sequelize.define("user_infos", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING
    },
   email: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
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
  User_Info.associate = (models) => {
    User_Info.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
    User_Info.belongsTo(models.user_hobbis, {
      foreignKey: 'user_id'
    });
  };

  return User_Info;
};