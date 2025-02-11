//help us to manage users adding user getting user wathcing user sign in
const users=[];

const addUser=({id,name,room})=>{
//trim name
name=name.trim().toLowerCase();
room=room.trim().toLowerCase();
//check if there is existing user with username that the second username is trying to login
const existingUser=users.find((user)=>user.room ===  room && user.name ===name);
if(existingUser){
    return{error:'username is taken'}
}
const user={id,name,room};
users.push(user)
return{user}
}

const removeUser=()=>{
const index=users.findIndex((user)=>user.id===id);
if(index!==-1)
{
    return users.splice(index,1)[0];

}
}

const getUser=(id)=>users.find((user)=>user.id===id);

const getUsersInRoom=(room)=>users.filter((user)=>user.room===room);

module.exports={addUser,removeUser,getUser,getUsersInRoom};