const express = require("express");
const router = express.Router();
const userController = require("../controllers/userHobbi");

router.post(
  "/api/userHobbiRegistration",
  userController.createUserHobbisAccount
);

router.get("/api/getAllUserHobbiData", userController.allData);

router.get("/api/getUserHobbiDataById", userController.findone);

router.put("/api/UserHobbiUpdateById/:id", userController.updateData);

router.delete("/api/deleteUserDataById/:id", userController.destroy);

router.get("/api/getHobbies", userController.hobbies);

router.post(
  "/api/multipleUsersOneRegistration",
  userController.createMultipleAccountOne
);
router.post(
  "/api/multipleUsersTwoRegistration",
  userController.createMultipleAccountTwo
);
router.post(
  "/api/multipleUsersThreeRegistration",
  userController.createMultipleAccountThree
);

module.exports = router;
