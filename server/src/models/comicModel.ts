import mongoose from 'mongoose'

const comicSchema = new mongoose.Schema(
    {
        id:{
            type: String
        },
        title:{
            type: String,
        },
        company:{
            type: String
        },
        pages:{
            type: Number
        },
        issueNumber:{
            type: Number
        },
        publication_year:{
            type: Number
        },
        isComplete:{
            type: Boolean
        },
        author:{
            type: String
        },
        artist:{
            type: String
        },
        isHardCover:{
            type: Boolean
        }
    },
    {
        versionKey: false
    }
)

const Comic = mongoose.model('comics',comicSchema)
export default Comic