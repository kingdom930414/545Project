const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require('mongodb');
const group = mongoCollections.group;
const userData = require("./user");
module.exports={
    async createGroup(name){
        if(!name) throw "Group name doesn't provide yet";
        const groupCollection = await group();
        let member = [];
        let messages = [];
        let newGroup = {
            name,
            member,
            messages
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
        // console.log("in get a group by id")
        if(!id) throw "Id doesn't exist";

        const groupCollection = await group();
        let res = await groupCollection.findOne({_id:ObjectId(id)});
        // console.log(res)
        if(res === null) throw "Group doesn't exist";
        return res;
    },
    async addMessageToGroup(id,message){
        console.log(" in add message to group")
        if(!id||!message) throw "Message doesn't apply";
        let newMessage = {
            $push:{
                messages: message
            }
        }
        const groupCollection = await group();
        let group_id = ObjectId(id)
        console.log(group_id)
        const updateInfo = await groupCollection.updateOne({_id:group_id},newMessage);
        if (updateInfo.modifiedCount === 0) {
            throw new Error("could not update likes of this animal .");
        }
        let newGroup = await groupCollection.findOne({_id:group_id});
        console.log(newGroup)
        return newGroup.messages;
    },
    async getMessages(id){
        console.log("in get messages")
        if(!id) throw "id doesn't exist";
        const groupCollection = await group();
        let res = await groupCollection.findOne({_id:ObjectId(id)});
        return res.messages;
    },
    async getGroupMember(id){
        console.log("In get group member")
        // console.log("id "+id)
        let group ;
        try{
            group = await this.getGroupById(id);
        }catch(e){
            throw e;
        }
        let members = group.member;
        // console.log(members);
        const groupMember = [];
        for(let i in members){
            let user = await userData.getUserById(members[i]);
            groupMember.push(user);
        }
        
        return groupMember;
    }
}