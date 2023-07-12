const routes = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
dotenv.config();

routes.use("/api-docs", auth.ensureAuth, swaggerUi.serve);
routes.get("/api-docs", auth.ensureAuth, swaggerUi.setup(swaggerDocument));

module.exports = routes;
