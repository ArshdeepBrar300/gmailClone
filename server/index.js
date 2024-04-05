import  express, { json }  from "express";
import dbConnection from './database/db.js'
import cors from 'cors'
import path from 'path'
import session from "express-session";
import passport from "passport";
import OAuth2Strategy from 'passport-google-oauth2'
import routes from "./routes/route.js";
import { userExistCheck } from "./controller/userController.js";
// import user from "./models/user.js";
import cookieSession from "cookie-session";

const __dirname=path.resolve();
const app=express();

const PORT=process.env.PORT|| 8000;
const GoogleStrategy=OAuth2Strategy.Strategy;
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))

app.use(session({secret:process.env.SESSION_SECRET, resave :false,
saveUninitialized: false,
expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
// cookie : {
//     secure:false,
//         maxAge:(1000 * 60 * 100)
// }
 }),)
app.use(passport.initialize())
app.use(passport.session())

let user;
passport.use(new GoogleStrategy({clientID:process.env.CLIENT_ID,clientSecret:process.env.CLIENT_SECRET, callbackURL:"https://gmailserver-j0ib.onrender.com/auth/google/callback",passReqToCallback:true},async(request,accessToken,refreshToken,profile,done)=>{
    try {
        
        let newuser=await userExistCheck(profile)
        // await saveUserID(accessToken)
       
        user=newuser
        return done(null,newuser)
    } catch (error) {
        return done(error,null)
    }
}))
passport.serializeUser((user,done)=>{
  
    done(null,user);
})

passport.deserializeUser((user,done)=>{
 
  
    done(null,user)});




// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:'/login',
    failureRedirect:"/"
}
))

app.get("/logout", (req, res) => {

    console.log('got logout req');
    req.session.destroy(function() {
        res.clearCookie("connect.sid");
        user=null
      
        res.status(200).json('logout done')
        
    }); 
    

   // Redirect to home page after logout
});
app.get("/login/success",async(req,res)=>{
    
  
    if(user){
        res.status(200).json({message:"user Login",user:user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})






app.use('/',routes);
// passport.authenticate("google",{successRedirect:"/emails/inbox",failureRedirect:'/login',}))

dbConnection()
app.listen(PORT,()=>{
    console.log(`Server started on Port : ${PORT}`);
})