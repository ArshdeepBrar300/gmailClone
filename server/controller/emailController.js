
import Email from "../models/email.js";
import user from "../models/user.js";
import  { updateUser } from './userController.js'



export const saveSentEmails=async(req,res)=>{
    let userData;
let sessionKeys=(Object.keys(req.sessionStore.sessions))
sessionKeys.forEach(sessionKey => {
    const sessionData = JSON.parse(req.sessionStore.sessions[sessionKey]);
    userData= sessionData.passport?.user || sessionData.user;
   
  });
    try {
        const sessionData=req.session
      console.log(sessionData);
      console.log(req);
        const User = await user.findById(userData._id);
        
        const email=new Email(req.body)
        email.save();
      
        const emails=User.emails;
        emails.push(email._id);
        // sessionData.passport.user.emails=emails
        userData.emails=emails
        // console.log(User.emails);
        await User.save();
        req.session.save((err) => {
            if (err) {
            
              console.error('Error saving session:', err);
            } else {
              console.log('Session data updated successfully');
            
            }
          });
        res.status(200).json('Email saved successfully')

        
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
        
    }

}

export const getEmails=async(req,res)=>{



let userData;
let sessionKeys=(Object.keys(req.sessionStore.sessions))
sessionKeys.forEach(sessionKey => {
    const sessionData = JSON.parse(req.sessionStore.sessions[sessionKey]);
    userData= sessionData.passport?.user || sessionData.user;
   
  });
 
  
    try {
        let emails
      
        if(req.params.type==='bin'){
            emails = await Email.find({ bin: true,_id:userData._id});
        }
        else if(req.params.type==='allmail'){
            emails = await Email.find({_id:{$in:userData.emails}});
            let inboxEmails=await Email.find({to:userData.email});
           
            emails.concat(inboxEmails);
            console.log('all mails fetch');
        }
        else if(req.params.type==='inbox'){
            emails = await Email.find({to:userData.email});
        }
        else if(req.params.type==='starred'){
            console.log('starred');
            emails=await Email.find({starred:true,bin:false,_id:{$in:userData.emails}})
        }
        else{
        //  console.log(User.emails);
            emails=await Email.find({ type: req.params.type,from:{$in:userData.email}})
          
       
        }
       
        return res.status(200).json({emails})
        
    } catch (error) {
        // console.log(error);
        res.status(500).json(error.message)
        
    }
}

export const moveEmailsToBin=async(req,res)=>{
    try {
        await Email.updateMany({_id:{$in: req.body}},{$set: {bin:true,starred:false,type:''}})
        
        return res.status(200).json('Emails Sent to Bin')
        
    } catch (error) {
        // console.log(error);
        res.status(500).json(error.message)
        
    }
}
export const toggleStarredEmails=async(req,res)=>{
    try {
        await Email.updateOne({_id:req.body.id},{$set:{starred:req.body.value}})
        return res.status(200).json('Emails Starred successfully')

        
    } catch (error) {
        // console.log(error);
        res.status(500).json(error.message)
        
    }
}

export const deleteEmails=async(req,res)=>{
    let userData;
let sessionKeys=(Object.keys(req.sessionStore.sessions))
sessionKeys.forEach(sessionKey => {
    const sessionData = JSON.parse(req.sessionStore.sessions[sessionKey]);
    userData= sessionData.passport?.user || sessionData.user;
   
  });
    try {
        await Email.deleteMany({_id:{$in:req.body}});
        await  user.findOneAndUpdate({_id:userData._id},{$pull:{emails:{$in:req.body.map(id=>ObjectId(id))}}})
        await updateUser(userData);
        
        return res.status(200).json('Email deleted Successfully')
        
    } catch (error) {
        // console.log(error);
        res.status(500).json(error.message)
        
    }
}