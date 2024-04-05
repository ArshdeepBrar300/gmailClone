
import Email from "../models/email.js";
import user from "../models/user.js";
import currentUserId, { updateUser } from './userController.js'



export const saveSentEmails=async(req,res)=>{
    try {
        const sessionData=req.session
      
        const User = await user.findById(req.user);
        
        const email=new Email(req.body)
        email.save();
      
        const emails=User.emails;
        emails.push(email._id);
        sessionData.passport.user.emails=emails
        req.session.passport.user.emails=emails
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

   
console.log('emails request');
    try {
        let emails
      
        if(req.params.type==='bin'){
            emails = await Email.find({ bin: true,_id:{$in:req.session.passport.user.emails}});
        }
        else if(req.params.type==='allmail'){
            emails = await Email.find({_id:{$in:req.session.passport.user.emails}});
            let inboxEmails=await Email.find({to:req.session.passport.user.email});
           
            emails.concat(inboxEmails);
            console.log('all mails fetch');
        }
        else if(req.params.type==='inbox'){
            emails = await Email.find({to:req.session.passport.user.email});
        }
        else if(req.params.type==='starred'){
            console.log('starred');
            emails=await Email.find({starred:true,bin:false,_id:{$in:req.session.passport.user.emails}})
        }
        else{
        //  console.log(User.emails);
            emails=await Email.find({ type: req.params.type,from:{$in:req.session.passport.user.email}})
          
       
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
    try {
        await Email.deleteMany({_id:{$in:req.body}});
        await  user.findOneAndUpdate({_id:req.user.id},{$pull:{emails:{$in:req.body.map(id=>ObjectId(id))}}})
        await updateUser(req);
        
        return res.status(200).json('Email deleted Successfully')
        
    } catch (error) {
        // console.log(error);
        res.status(500).json(error.message)
        
    }
}