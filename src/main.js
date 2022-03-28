let port = 8000;
import express from "express";
import moment from "moment";
import log from "./logger/logger";
import config from "config";
import models from "./models";
import Routes from "./routes";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

log.info(moment().format("hh:mm:ss a"));
let conf = config.get("development");
log.info(conf.username);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/", Routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

models.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => log.info(`Database listening to port ${port}`));
  })
  .catch((err) => log.error(err));
