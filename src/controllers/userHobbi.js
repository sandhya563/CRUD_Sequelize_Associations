const Sequelize = require("sequelize");
const db = require("../models");
const User_Hobbis = db.user_hobbis;
const User_Info = db.user_infos;
const User = db.users;
const { Op } = require("sequelize");

// Create and Save a new user
async function createUserHobbisAccount(req, res) {
  try {
    const body = req.body;
    const obj = {
      user_id: req.body.user_id,
      hobbis: req.body.hobbis,
    };
    const userCollection = await User_Hobbis.create(obj);
    res.status(201).send(userCollection);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
// show all data
function allData(req, res) {
  User_Hobbis.findAll({
    include: [
      {
        model: User_Info,
        as: "user_infos",
      },
      {
        model: User,
      },
    ],
  })
    .then((user) => {
      // for storing duplicate hobbies in arrray
      for (var i = 0; i < user.length; i++) {
        user[i].hobbis = [
          ...new Set(
            user.flatMap((item) => {
              return item.user_id == user[i].user_id
                ? item.hobbis !== Array
                  ? [item.hobbis]
                  : item.hobbis
                : [];
            })
          ),
        ];
      }
      // for remove duplicate object
      const uniqueIds = [];
      const unique = user.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.user_id);
        if (!isDuplicate) {
          uniqueIds.push(element.user_id);
          return true;
        }
        return false;
      });
      return res.status(200).json(unique);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error);
    });
}

// Find a single data with an id
async function findone(req, res) {
  User_Hobbis.findAll({
    where: { user_id: req.body.user_id },
    include: [
      {
        model: User_Info,
        as: "user_infos",
      },
      {
        model: User,
      },
    ],
    //   include: [{
    //     model:  User_Info,
    //     model: User,
    //     where: {user_id: req.body.user_id}
    // }],
  })
    .then((data) => {
      if (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].hobbis = [
            ...new Set(
              data.flatMap((item) => {
                return item.user_id == data[i].user_id
                  ? item.hobbis !== Array
                    ? [item.hobbis]
                    : item.hobbis
                  : [];
              })
            ),
          ];
        }
        const uniqueIds = [];
        const unique = data.filter((element) => {
          const isDuplicate = uniqueIds.includes(element.user_id);
          if (!isDuplicate) {
            uniqueIds.push(element.user_id);
            return true;
          }
          return false;
        });
        return res.status(200).json(unique);
      } else {
        res.status(404).send({
          message: `Cannot find data with id ${user_id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving data with id ${user_id}`,
      });
    });
}

// Update a table by the id in the request
async function updateData(req, res) {
  let id = req.params.id;
  const { hobbis } = req.body;
  await User_Hobbis.update({ hobbis }, { where: { id: id } });
  let data = await User_Hobbis.findByPk(id);
  if (data) {
    return res.json({ message: "data updated successfully", data });
  } else {
    return res.status(404).send({ error: "user not found" });
  }
}

// Delete a table data with the specified id in the request
async function destroy(req, res) {
  let id = req.params.id;
  await User_Hobbis.destroy({ where: { user_id: id } })
    .then((count) => {
      if (!count) {
        return res.status(404).send({ error: "user not found" });
      }
      return res.status(200).send({
        message: "User deleted",
      });
    })
    .catch(() => {
      return res.status(404).send({ error: "user not found" });
    });
}

// Hobbies data
async function hobbies(req, res) {
  User_Hobbis.findAll({
    where: {
      hobbis: {
        //  [Op.like]: req.body.hobbis
        [Op.iLike]: { [Op.any]: [req.body.hobbis]},
      },
    },
    include: [
      {
        model: User_Info,
        as: "user_infos",
      },
      {
        model: User,
      },
    ],
  })
    .then((data) => {
      // console.log("data", data);
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find data with this hobbies`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving data with this hobbies`,
      });
    });
}

module.exports = {
  createUserHobbisAccount,
  findone,
  updateData,
  destroy,
  allData,
  hobbies,
};
