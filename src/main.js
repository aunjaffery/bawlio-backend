let port = 8000;
import express from "express";
import moment from "moment";
import log from "./logger/logger";
import config from "config";
import models from "./models";
import Routes from "./routes";

log.info(moment().format("hh:mm:ss a"));
let conf = config.get("development");
log.info(conf.username);

const app = express();
app.use(express.json());

app.use("/api/", Routes);
models.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => log.info(`Database listening to port ${port}`));
  })
  .catch((err) => log.error(err));
