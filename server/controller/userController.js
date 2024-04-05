import user from "../models/user.js"
import axios from "axios"
let currentUserId;
export const userExistCheck=async(profile)=>{
    try {
    
        let currentUser=await user.findOne({ googleId: profile.id });
     
        
        if(!currentUser){
            currentUser=new user({
                googleId:profile.id,
                displayName:profile.displayName,
                email:profile.emails[0].value,
                image:profile.photos[0].value,
                emails:[]
            })
            console.log(currentUser);
            await currentUser.save()
        }
       currentUserId=currentUser._id;
        return currentUser
    } catch (error) {
        
    }

}

export const updateUser=async(req)=>{
    console.log();
    const updatedUser = await user.findById(req.user._id); 

// Manually update the user object stored in the session
req.login(updatedUser, function(err) {
  if (err) {
    console.log('error',error);
  } else {
    console.log('succesfully updated user');
  }
});

}


export default currentUserId;