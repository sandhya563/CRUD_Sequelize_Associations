const db = require("../models");
const User_Info = db.user_infos;
const User = db.users;

// Create and Save a new user
async function createUseInfoAccount(req, res) {
  try {
    const obj = {
      address: req.body.address,
      email: req.body.email,
      user_id: req.body.user_id,
    };
    const usersData = await User_Info.create(obj);
    res.status(201).send(usersData);  
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

// show all data
function index(req, res) {
  User_Info.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

// // Find a single data with an id
async function findOne(req, res) {
  const id = req.params.id;
  User_Info.findOne({where:{user_id: id}})
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find data with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving data with id ${id}`,
      });
    });
}

// // Update a table by the id in the request

async function updateData(req, res) {
  let id = req.params.id;
  const { email} = req.body;
  await User_Info.update({ email}, { where: { id: id } });
  let data = await User_Info.findByPk(id);
  if(data){
    return res.json({message:"data updated successfully",data});
 }else{
   return res.status(404).send({ error: "user not found" });
 }
}

// // Delete a table data with the specified id in the request
async function destroy(req, res) {
  let id = req.params.id;
  await User_Info.destroy({ where: { id: id } })
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


module.exports = { createUseInfoAccount, index, findOne, updateData, destroy };
