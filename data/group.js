const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require('mongodb');
const group = mongoCollections.group;
const userData = require("./user");
module.exports={
    async createGroup(name){
        if(!name) throw "Group name doesn't provide yet";
        const groupCollection = await group();
        let member = [];
        let newGroup = {
            name,
            member
        }
        console.log("create a new group")
        const createGroup = await groupCollection.insertOne(newGroup);
        if(createGroup.insertedCount === 0) throw "Group can not be created successfully";
        console.log("group create successfully")
        let newId = createGroup.insertedId;
        let res = await this.getGroupById(newId);
        return res;
    },
    async getAllGroup(){
        const groupCollection = await group();
        const all = await groupCollection.find({}).toArray();
        return all;
    },
    async getGroupById(id){
        console.log("in get a group by id")
        if(!id) throw "Id doesn't exist";

        const groupCollection = await group();
        let res = await groupCollection.findOne({_id:ObjectId(id)});
        console.log(res)
        if(res === null) throw "Group doesn't exist";
        return res;
    },
    async getGroupMember(id){
        console.log("In get group member")
        console.log("id "+id)
        let group ;
        try{
            group = await this.getGroupById(id);
        }catch(e){
            throw e;
        }
        let members = group.member;
        console.log(members);
        const groupMember = [];
        for(let i in members){
            let user = await userData.getUserById(members[i]);
            groupMember.push(user);
        }
        
        return groupMember;
    }
}