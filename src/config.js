import dotenv from "dotenv";
dotenv.config();



const config = {
    
    persistence : process.env.PERSISTENCE,   
 dbUrl : process.env.DB_URL,
 sessionSecret: process.env.SESSION_SECRET,

 clientID: process.env.CLIENT_ID,
 clientSecret: process.env.CLIENT_SECRET,
 callbackUrl: process.env.CALLBACK_URL,
};



export default config;