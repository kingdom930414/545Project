const express = require('express');
const router = express.Router();
const data = require('../data');
const groupData = data.group;
const userData = data.user;
router.get("/",async(req,res) => {
    try{
        console.log("Home Page")
        res.render("group/welcome",{layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});
router.get("/signup",async(req,res) => {
    try{
        console.log("get sign up Page")
        console.log(req.body)
        res.render("group/signup",{layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});
router.post("/signup",async(req,res) => {
    try{
        console.log("post sign up Page")
        console.log(req.body)
        let name = req.body.username;
        let email = req.body.email;
        console.log("The user name is "+name+"  and email is  "+email);
        let user = await userData.createUser(name,email);
        if(user !== null){
            const groups = await groupData.getAllGroup();
            res.render("group/joinGroup",{groups,user,layout: 'main.handlebars' });
        }else{
            throw "Fail to sign up.";
        }
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

router.get("/:id", async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.params)
        const members = await groupData.getGroupMember(req.params.id);
        const groups = await groupData.getAllGroup();
        res.render("group/index", { members,groups,
            layout: 'main.handlebars' });
    } catch (e) {
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});
router.get("join/:id/", async (req, res) => {
    try {
        console.log("join a group")
        let groupId = req.params.id;
        let userId = req.params.userId;
        console.log("group id "+groupId);
        console.log("user Id "+userName);
        let newGroup = await userData.addToGroup(userId,groupId);
        let members = await groupData.getGroupMember(newGroup._id);
        console.log("new group mmebers")
        console.log(members)
        const groups = await groupData.getAllGroup();
        res.render("group/index", { members,groups,
            layout: 'main.handlebars' });
    } catch (e) {
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

router.post('/', async (req, res) => {
    console.log("in create user");
    let newUser = req.body;
    
    try {
        if(newUser.name!=undefined||newUser.email!=undefined){
            const {name,email} = newUser;
            let createOne = await userData.createUser(name,email);
            console.log(createOne)
            res.status(200).json(createOne);
        }else{
            return res.sendStatus(400);
        }	
	} catch (e) {
		res.json({ error: ""+e }).sendStatus(500);
	}
});

module.exports = router;