require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const clientRoute = require("./routes/client.routes");
const adminRoute = require("./routes/admin.routes");
const authRoute = require("./routes/auth.routes");
const filesRoute = require("./routes/files.routes");
const { prepareApp } = require("./helpers/app");
require("./auth/passport");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));


app.use("/api", authRoute);
app.use("/api/admin/files", filesRoute);
app.use("/api/client/files", filesRoute);


app.use(
  "/api/client",
  passport.authenticate("client", {
    session: false,
    failureRedirect: "/unauthorised",
  }),
  clientRoute
);

app.use(
  "/api/admin",
  passport.authenticate("admin", {
    session: false,
    failureRedirect: "/unauthorised",
  }),
  adminRoute
);

app.use("/unauthorised", (_, res) => {
  res.status(401).json({ message: "Unauthorised" });
});


mongoose.connect(process.env.MONGODB_URL).then(() => {
  const port = process.env.PORT || 8000
  prepareApp().then(() => {
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  }).catch(err => {
    console.log("An error occured", err);
  })

});