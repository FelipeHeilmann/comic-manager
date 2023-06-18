import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI

export const connectToMongo = () =>{
    mongoose.connect(MONGO_URI!)
        .then(() => {
            console.log('Connected')
        })
        .catch((error) => {
            console.log(error)
        })
}