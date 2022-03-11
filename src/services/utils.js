import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
let secret = "bawli0_911";

const methods = {
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, 10, (err, passwordHash) => {
        if (err) {
          reject(err);
        } else {
          resolve(passwordHash);
        }
      });
    });
  },

  comparePassword: (pw, hash) => {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(pw, hash, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  issueToken: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        { expiresIn: "300 days" },
        function (err, token) {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  },

  verifyToken: (token, cb) => jwt.verify(token, secret, {}, cb),

  generateRandomToken: (length) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length, function (err, buffer) {
        if (err) {
          reject(err);
        } else {
          console.log(buffer);
          resolve(buffer.toString("hex"));
        }
      });
    });
  },
};

export default methods;
