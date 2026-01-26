const bcrypt = require("bcryptjs");

const password = process.argv[2] || "password";
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);
