import express from 'express'
import 'dotenv/config'
import { userRoutes } from './routes/userRoutes'
import { connectToMongo } from './database'
import { comicRoutes } from './routes/comicRoutes'
const routes = [userRoutes, comicRoutes]

const app = express()
const PORT = process.env.PORT

app.use(express.json())
connectToMongo()

for(const route of routes){
    route(app)
}

app.listen(PORT, ()=>{
    console.log('Server running on http:localhost:3333')
})