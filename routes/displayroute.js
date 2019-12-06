const express = require('express');
const router = express.Router();
const data = require('../data');
const groupData = data.group;
const grouplist = async () =>{
    let res = await groupData.getAllGroup();
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(res)
    return res;
}
router.get("/calendar",async(req,res) => {
    try{
        let groups = await grouplist();
        console.log("calendar")
        res.render("group/calendar",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});
router.get("/google_maps",async(req,res) => {
    try{
        let groups = await grouplist();
        res.render("group/google_maps",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

router.get("/profile",async(req,res) => {
    try{
        let groups = await grouplist();
        res.render("group/profile",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

router.get("/todo_list",async(req,res) => {
    try{
        let groups = await grouplist();
        console.log("todo_list")
        res.render("group/todo_list",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

router.get("/inbox",async(req,res) => {
    try{
        let groups = await grouplist();
        res.render("group/inbox",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});
router.get("/blank",async(req,res) => {
    try{
        let groups = await grouplist();
        res.render("group/blank",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

router.get("/500",async(req,res) => {
    try{
        let groups = await grouplist();
        res.render("group/500",{groups,layout: 'main.handlebars' });
    }catch(e){
        res.status(400).render("group/error", { 
            layout: 'main.handlebars', err: e});
    }
});

module.exports = router;