import { Request, Response } from 'express'
import User from '../models/userModel'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface CustomRequest extends Request{
    auth?: string
}

export const validateToken = async(req: CustomRequest, res: Response, next: () => void)=>{
    const authHeader = req.headers && req.headers.authorization
    const [, token] = authHeader ? authHeader.split(' ') : []
    try {
        const SECRET = process.env.SECRET
        console.log(SECRET)
        const payload = await jwt.verify(token, SECRET!) as JwtPayload
        console.log(payload)
        const user = await User.findById(payload.id)

  
        if (!user) {
            return res.status(401).json({message: 'Acesso negado'})
        }
  
        req.auth = user.id
  
        next()
    } catch (error) {
        return res.status(400).json({message: 'Token inválido'})
    }
}