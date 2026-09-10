import { Request, Response, NextFunction } from 'express';
import crypto from 'node:crypto';
import { users, Role, User } from '../data.js';

const SECRET = process.env.AUTH_SECRET || 'capacity-connect-local-demo-secret-change-in-production';
function sign(payload:string){ return crypto.createHmac('sha256', SECRET).update(payload).digest('hex'); }
export function issueToken(user:User){ const body=Buffer.from(JSON.stringify({sub:user.id,role:user.role,org:user.organizationId})).toString('base64url'); return `${body}.${sign(body)}`; }
function verifyToken(token:string){ const [body,mac]=token.split('.'); if(!body||!mac||sign(body)!==mac)return null; try{return JSON.parse(Buffer.from(body,'base64url').toString()) as {sub:string;role:Role;org:string};}catch{return null;} }
export type AuthedRequest = Request & { user?:User };
export function auth(req:AuthedRequest,res:Response,next:NextFunction){
  const demoId=req.header('x-demo-user');
  const bearer=req.header('authorization')?.replace(/^Bearer\s+/i,'');
  const identity=bearer?verifyToken(bearer):demoId?{sub:demoId}:null;
  const user=identity?users.find(u=>u.id===identity.sub):undefined;
  if(!user)return res.status(401).json({success:false,error:{code:'AUTH_UNAUTHORIZED',message:'Please sign in to continue.'}});
  if(user.status==='suspended')return res.status(403).json({success:false,error:{code:'AUTH_ACCOUNT_SUSPENDED',message:'Your account is suspended. Please contact your administrator.'}});
  if(user.status==='disabled')return res.status(403).json({success:false,error:{code:'AUTH_ACCOUNT_DISABLED',message:'Your account is disabled. Please contact your administrator.'}});
  req.user=user; next();
}
export function role(...roles:Role[]){return (req:AuthedRequest,res:Response,next:NextFunction)=>{if(!req.user||!roles.includes(req.user.role))return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:'You do not have permission to access this area.'}});next();};}
export function publicUser(user:User){const {password:_,...safe}=user;return safe;}
