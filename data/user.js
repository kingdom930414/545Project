const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require('mongodb');
const user = mongoCollections.user;
const group = mongoCollections.group;
module.exports={
    async createUser(name,email){
        console.log("In create user");
        if(!name||!email){
            throw "this is not a valid user";
        }
        let newuser = {
            name,
            email
        }
        const userCollection = await user();

        let insert = await userCollection.insertOne(newuser);
        if(insert.insertedCount === 0) throw "Could not add user";

        let newId = insert.insertedId;

        let createdOne = await this.getUserById(newId);
        console.log("New User")
        console.log(createdOne)
        return createdOne
    },
    async getUserById(id){
        if(!id) throw "id not valid";

        const parseId = ObjectId(id);
        const userCollection = await user();
        let res = await userCollection.findOne({_id:parseId});
        if(res === null) throw "There is not such a user";
        return res;
    },
    async addToGroup(userId,groupId){
        console.log("in add to a group")
        if(!userId||!groupId) throw "Not a valid info";
        let group_id = ObjectId(groupId);
        let user_id = ObjectId(userId);
        console.log(`groupid is ${group_id}`+` and user id is ${user_id}`)
        let newMember ={
            $push:{
                member: user_id
            }
        }
        const groupCollection = await group();
        const updateInfo = await groupCollection.updateOne({_id:group_id},newMember);
        if (updateInfo.modifiedCount === 0) {
            throw new Error("could not update likes of this animal .");
        }
        let newGroup = await groupCollection.findOne({_id:group_id});
        return newGroup;
    },
    async removeFromGroup(userId,groupId){
        if(!userId||!groupId) throw "Not a valid info";

        const userCollection = await user();
        const groupCollection = await group();
        let user_id = ObjectId(userId);
        let group_id = ObjectId(groupId);
        let user = await userCollection.findOne({_id:user_id});
        let group = await groupCollection.findOne({_id:group_id});
        if(user === null) throw "User doesn't exist";
        if(group === null) throw "Group doen't exist";

        let newMember ={
            $pull:{
                member: user_id
            }
        }
        const updateInfo = await groupCollection.updateOne({_id:group_id},newMember);
        if (updateInfo.modifiedCount === 0) {
            throw new Error("User doesn't in this group yet");
        }
    }
}