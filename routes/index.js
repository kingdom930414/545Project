const grouproute = require("./groupChat")
const userroute = require("./userRouter")
const displayroute = require("./displayroute");
const constructorMethod = app => {
  app.use("/", displayroute);
  app.use("/", userroute);
  // app.use("/group",grouproute);
  // app.use("/user",userroute);
  app.get("*", (req, res) => {
    res.status(404).render("group/error", { title: 'Something Wrong', message: 'Cannot find page'})
  });
};

module.exports = constructorMethod;