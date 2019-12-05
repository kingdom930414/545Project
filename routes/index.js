const grouproute = require("./groupChat")
const userroute = require("./userRouter")
const constructorMethod = app => {
  app.use("/", userroute);
 let data = null;
  app.use("/chat", (req, res) => {
    res.status(200).send('<h1>Hello World</h1>');
  });
  app.post("/map", (req, res)=>{
    data = req.body;
    
  });
  app.get("/mapdata",(req,res)=>{
    res.json(data);
    
  });
  // app.use("/group",grouproute);
  // app.use("/user",userroute);
  app.get("*", (req, res) => {
    res.status(404).render("group/error", { title: 'Something Wrong', message: 'Cannot find page'})
  });
};

module.exports = constructorMethod;