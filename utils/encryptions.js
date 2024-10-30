const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw new Error(err);
        resolve(hash);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const comparePassword = (pwd1, pwd2) => {
  return bcrypt.compareSync(pwd1, pwd2);
};

module.exports = {
  hashPassword,
  comparePassword,
};
