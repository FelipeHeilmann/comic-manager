import { Express } from 'express'
import { AuthController } from '../controller/AuthController'

export const userRoutes = (app: Express) =>{
    app.post('/auth/register', AuthController.create)
    app.post('/auth', AuthController.login)
}