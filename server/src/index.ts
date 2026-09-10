import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import api from './routes/api.js';

const app=express();
app.disable('x-powered-by');
app.use(helmet({crossOriginResourcePolicy:false}));
app.use(cors({origin:process.env.CLIENT_ORIGIN?.split(',').map(x=>x.trim())||['http://localhost:5173']}));
app.use(express.json({limit:'2mb'}));
app.use(rateLimit({windowMs:60_000,max:180,standardHeaders:true,legacyHeaders:false}));
app.get('/',(_,res)=>res.json({service:'Capacity Connect API',version:'v1',status:'ok'}));
app.use('/api/v1',api);
app.use((_,res)=>res.status(404).json({success:false,error:{code:'NOT_FOUND',message:'We could not find that request.'}}));
app.use((err:any,_req:any,res:any,_next:any)=>{console.error(err);res.status(500).json({success:false,error:{code:'SERVER_ERROR',message:'Something went wrong. Please try again.'}})});
const port=Number(process.env.PORT||4000);
app.listen(port,()=>console.log(`Capacity Connect API running on http://localhost:${port}`));
