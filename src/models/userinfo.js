
module.exports = (sequelize, Sequelize) => {
  const User_Info = sequelize.define("user_infos", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
      validate:{
        isAlpha:{
          msg: "The address must be an contain latters like this 'Delhi' ",
        },
      },
      
    },
   email: {
      type: Sequelize.STRING,
      validate:{
        isEmail: {
          msg: "The email must be an contain Email Address like this '@gmail.com' ",
        },
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
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