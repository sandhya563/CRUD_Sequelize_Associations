const { Sequelize, Op } = require("sequelize");
const db = require("../models");
const User_Hobbis = db.user_hobbis;
const User_Info = db.user_infos;
const User = db.users;

// Create and Save a new user
async function createUserHobbisAccount(req, res) {
  try {
    // let userCollection;
    const body = req.body;
    const obj = {
      user_id: body.user_id,
      hobbis: body.hobbis,
    };
    // for (let i = 0; i < body.hobbis.length; i++) {
    // userCollection = await User_Hobbis.create({user_id: body.user_id,hobbis: body.hobbis[i]});
    // }
    const userCollection = await User_Hobbis.create(obj);

    res.send({
      status: "success",
      statusCode: "statusCode 201",
      data: userCollection,
    });
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
        // as: "user_infos",
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
      return res.json({
        status: "success",
        statusCode: "statusCode 200",
        data: unique,
      });
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
        return res.status(200).json({
          status: "success",
          statusCode: "statusCode 200",
          data: unique,
        });
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

// Update a table by id 
async function updateData(req, res) {
  let id = req.params.id;
  const { hobbis } = req.body;
  await User_Hobbis.update({ hobbis }, { where: { id: id } });
  let data = await User_Hobbis.findByPk(id);
  if (data) {
    return res.json({ message: "data updated successfully", data: data });
  } else {
    return res.status(404).send({ error: "user not found" });
  }
}

// Delete a table data with the specified id
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
        [Op.iLike]: { [Op.any]: req.body.hobbis },
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

// Post API 1 insert data at time in multiple tables
async function createMultipleAccountOne(req, res) {
  try {
    const body = req.body;
    var userInfoCollection;
    var userHobbiesCollection;
    const usersCollection = await User.create({ user_name: body.user_name });
    await User_Info.findByPk(usersCollection.id).then(async () => {
      userInfoCollection = await User_Info.create({
        address: body.address,
        email: body.email,
        user_id: usersCollection.id,
      });
    });
    await User_Hobbis.findByPk(usersCollection.id).then(async () => {
      for (let i = 0; i < body.hobbis.length; i++) {
        userHobbiesCollection = await User_Hobbis.create({
          hobbis: body.hobbis[i],
          user_id: usersCollection.id,
        });
      }
    });
    res.status(201).send({
      status: "data inserted successfully",
      statusCode: "statusCode 201",
      data: [usersCollection, userInfoCollection, userHobbiesCollection],
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

// Post Api 2 insert data at time in multiple tables
async function createMultipleAccountTwo(req, res) {
  try {
    var usersCollection;
    var userInfoCollection;
    var userHobbiesCollection;
    var body = req.body;
    let usersData = [];
    for (var i in body) {
      usersCollection = await User.create({ user_name: body[i].user_name });
      await User_Info.findByPk(usersCollection.id).then(async () => {
        userInfoCollection = await User_Info.create({
          address: body[i].address,
          email: body[i].email,
          user_id: usersCollection.id,
        });
      });
      await User_Hobbis.findByPk(usersCollection.id).then(async () => {
        for (let j = 0; j < body.length; j++) {
          for (let i = 0; i < body[j].hobbis.length; i++)
            userHobbiesCollection = await User_Hobbis.create({
              hobbis: body[j].hobbis[i],
              user_id: usersCollection.id,
            });
        }
      });
      usersData.push(
        usersCollection,
        userInfoCollection,
        userHobbiesCollection
      );
    }
    res.status(201).send({
      status: "data inserted successfully",
      statusCode: "statusCode 201",
      data: usersData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

// Post Api 3 insert data at time in multiple tables
async function createMultipleAccountThree(req, res) {
  try {
    var usersCollection;
    var userInfoCollection;
    var userHobbiesCollection;
    var body = req.body;
    let usersData = [];
    for (var i in body) {
      usersCollection = await User.create({
        user_name: body[i].user.user_name,
      });
      await User_Info.findByPk(usersCollection.id).then(async () => {
        userInfoCollection = await User_Info.create(
          {
            address: body[i].info.address,
            email: body[i].info.email,
            user_id: usersCollection.id,
          },
        );
      });
      await User_Hobbis.findByPk(usersCollection.id).then(async () => {
        for (let j = 0; j < body.length; j++) {
          for (let i = 0; i < body[j].hosbbies.hobbis.length; i++) {
            userHobbiesCollection = await User_Hobbis.create({
              hobbis: body[j].hosbbies.hobbis[i],
              user_id: usersCollection.id,
            });
          }
        }
      });
      usersData.push({
        user: usersCollection,
        info: userInfoCollection,
        hobbies: userHobbiesCollection,
      });
    }
    res.status(201).send({
      status: "data inserted successfully",
      statusCode: "statusCode 201",
      data: usersData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = {
  createUserHobbisAccount,
  findone,
  updateData,
  destroy,
  allData,
  hobbies,
  createMultipleAccountOne,
  createMultipleAccountTwo,
  createMultipleAccountThree,
};
