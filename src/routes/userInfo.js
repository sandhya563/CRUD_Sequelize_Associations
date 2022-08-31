const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfo");

router.post("/api/userInfoRegistration", userInfoController.createUseInfoAccount)

router.get('/api/getUserInfoData', userInfoController.index)

router.get('/api/getUserInfoDataById/:id', userInfoController.findOne)

router.put('/api/getUpdateUserInfoData/:id', userInfoController.updateData)

 router.delete('/api/deleteUserInfoData/:id', userInfoController.destroy)






module.exports = router
