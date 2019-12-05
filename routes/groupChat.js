const express = require('express');
const router = express.Router();
const data = require('../data');
const groupData = data.group;
const userData = data.user;

router.get("/",async(req,res) =>{
    console.log("in get all groups///")
    try{
        const groups = await groupData.getAllGroup();
        res.status(200).json(groups);
    }catch(e){
        res.json({ error: ""+e }).sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    console.log("in post new group");
    let newGroup = req.body;
    
    try {
        if(newGroup.name!=undefined){
            const {name} = newGroup;
            console.log(name)
            let createOne = await groupData.createGroup(name);
            console.log(createOne)
            res.status(200).json(createOne);
        }else{
            return res.sendStatus(400);
        }	
	} catch (e) {
		res.json({ error: ""+e }).sendStatus(500);
	}
});

router.get('/:id', async (req, res) => {
    console.log("get group member////");
    console.log(req.params.id)
	try {
		const members = await groupData.getGroupMember(req.params.id);
		res.json(members);
	} catch (e) {
		res.json({ error: ""+e }).sendStatus(500);
	}
});

router.put('/:id', async (req, res) => {
    console.log(" in put a new user in group")
	const newGroupMember = req.body;
	try {
		await groupData.getGroupById(req.params.id);
	} catch (e) {
		return res.sendStatus(404);
	}

	try {
        let userId = newGroupMember.id;
        console.log(userId)
		const group = await userData.addToGroup(userId,req.params.id);
		res.json(group);
	} catch (e) {
		res.sendStatus(400);
	}
});
module.exports = router;