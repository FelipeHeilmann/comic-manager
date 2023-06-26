import User from '../models/userModel'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{
    static create = async (req: Request, res:Response) => {
        
        const {name, email, password} = req.body

        const existUser = await User.findOne({
            email: email
        })

        if(existUser){
            return res.status(422).json({
                message: 'Usuário já existe'
            })
        }
       
        const user = new User({
            name, 
            email, 
            password
        })

        try{   
            await user.save()
            return res.status(201).json({user})
        }
        catch(err){
            return res.status(500).json({err})
        }
    }

    static login = async (req: Request, res: Response) =>{
        const authHeader = req.headers && req.headers.authorization
        const [, hash] = authHeader ? authHeader.split(' ') : []
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':')
        
        const user = await User.findOne({email:email}).select('+password')
        
        if(!user){
            return res.status(422).json({message: 'Usuário não encontrado'})
        }

        const checkPass = await bcrypt.compare(password, user.password)
        
        if(!checkPass){
            return res.status(422).json({message: 'Email ou senha incorretos'})
        }

        const SECRET = process.env.SECRET
        
        const token = jwt.sign(
            {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                created_at: user.created_at
            },SECRET!,
            { expiresIn: 8400} 
        )

        return res.status(200).json({
            token: token
        })
    }
}

export { AuthController }