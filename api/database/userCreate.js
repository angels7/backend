var Sequelize = require('sequelize');
var passportLocalSequelize = require("passport-local-sequelize");

const sequelize = new Sequelize('demo_schema', 'root', 'password', {
    dialect: 'sqlite',
    storage: 'users.db'
});

var User = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    isPro: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    myhash: Sequelize.TEXT,
    mysalt: Sequelize.STRING
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
});

passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    emailField: 'email',
    isProField: 'isPro',
    hashField: 'myhash',
    saltField: 'mysalt',
});

sequelize.sync();

module.exports = User;