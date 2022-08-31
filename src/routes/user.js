const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/api/userRegistration", userController.createUserAccount)

router.get('/api/getAllUserData', userController.allData)

router.get('/api/getUserDataById/:id', userController.findOne)

router.put('/api/userUpdate/:id', userController.updateData)

router.delete('/api/deleteUserDataById/:id', userController.destroy)

module.exports = router
