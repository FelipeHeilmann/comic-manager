import express from 'express'
import 'dotenv/config'
import { userRoutes } from './routes/userRoutes'
import { connectToMongo } from './database'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
connectToMongo()
userRoutes(app)

app.listen(PORT, ()=>{
    console.log('Server running on http:localhost:3333')
})