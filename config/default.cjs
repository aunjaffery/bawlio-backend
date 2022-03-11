const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "bawlio",
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
};
