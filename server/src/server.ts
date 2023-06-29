import express from 'express'
import { userRoutes } from './routes/userRoutes'
import { connectToMongo } from './database'
import { comicRoutes } from './routes/comicRoutes'
import { uploadRoutes } from './routes/uploadRoutes'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'
import { errorMiddleware } from './middleware/error'


const routes = [userRoutes, comicRoutes, uploadRoutes]
const app = express()
const PORT = process.env.PORT

app.use(express.json(), cors(), express.urlencoded({extended: true}))
app.use('/files', express.static('uploads'))

connectToMongo()

for(const route of routes){
    route(app)
}

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log('Server running on http:localhost:3333')
})