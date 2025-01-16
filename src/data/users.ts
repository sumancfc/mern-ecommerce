const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Suman Shrestha",
    email: "suman@gmail.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "Sumi Shrestha",
    email: "sumi@gmail.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "Sumana Shrestha",
    email: "sumana@gmail.com",
    password: bcrypt.hashSync("123456", 12),
  },
];

module.exports = users;
