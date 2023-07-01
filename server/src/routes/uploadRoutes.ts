import { Express } from 'express'
import multer from 'multer'
import { storage } from '../config/multer'

const upload = multer ({ storage: storage })

export const uploadRoutes = (app: Express) =>{
    app.post('/upload', upload.single('file'), (req, res)=>{
        return res.status(200).json(req.file?.filename)
    })
}