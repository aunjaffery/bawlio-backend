let port = 8000;
import express from "express";
import moment from "moment";
import log from "./logger/logger";
import config from "config";
import models from "./models";
import Routes from "./routes";
import cors from "cors";

log.info(moment().format("hh:mm:ss a"));
let conf = config.get("development");
log.info(conf.username);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/", Routes);
models.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => log.info(`Database listening to port ${port}`));
  })
  .catch((err) => log.error(err));
