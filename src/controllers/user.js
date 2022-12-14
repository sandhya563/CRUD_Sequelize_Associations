const db = require("../models");
const User = db.users;

// Create and Save a new user
async function createUserAccount(req, res) {
  try {
    const obj = {
      user_name: req.body.user_name,
    };
    const userCollection = await User.create(obj);
    res.status(201).send({
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
  User.findAll()
    .then((user) => {
      return res.json({
        status: "success",
        statusCode: "statusCode 200",
        data: user,
      });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

// Find a single data with an id
async function findOne(req, res) {
  const id = req.params.id;
  User.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.send({
          status: "success",
          statusCode: "statusCode 200",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find data with id ${id}`,
        });
      }
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(500).send({
        message: `Error retrieving data with id ${id}`,
      });
    });
}

// Update a table by the id in the request

async function updateData(req, res) {
  let id = req.params.id;
  const { user_name } = req.body;
  await User.update({ user_name }, { where: { id: id } });
  let data = await User.findByPk(id);
  if (data) {
    return res.json({
      status: "success",
      statusCode: "statusCode 204",
      data: data,
    });
  } else {
    return res.status(404).send({ error: "user not found" });
  }
}

//  Delete a table data with the specified id in the request
async function destroy(req, res) {
  let id = req.params.id;
  await User.destroy({ where: { id: id } })
    .then((count) => {
      if (!count) {
        return res.status(404).send({ error: "user not found" });
      }
      return res.status(200).send({
        status: "success data deleted",
        statusCode: "statusCode 204",
      });
    })
    .catch(() => {
      return res.status(404).send({ error: "user not found" });
    });
}

module.exports = { createUserAccount, allData, findOne, updateData, destroy };
