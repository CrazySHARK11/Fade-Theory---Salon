import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const authMiddleware = async (req, res, next) =>{
    try{
      const token = req.cookies.token;
      if(!token) return res.status(401).json({ msg: 'No authentication token' });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id).select('-password')
      if(!user) return res.status(401).json({ msg: 'User not found' });
      req.user = user;
      next();
    }catch(err){
      next(err);
    }
}
 