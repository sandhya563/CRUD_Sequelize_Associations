
const express = require('express');
const userRoutes = require('./src/routes/user')
const userInfoRoutes = require('./src/routes/userInfo')
const userHobbiRoutes = require('./src/routes/userhobbis')
const app = express();
const db = require("./src/models/index");
db.sequelize.sync();
app.use(express.json());

app.use("/usersData", userRoutes)
app.use("/userInfoData", userInfoRoutes)
app.use("/usersHobbiData", userHobbiRoutes)


app.listen(3000, () => {
  console.log('server is runing on 3000 port')
});

