import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
        coverUrl:{
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
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {
        versionKey: false
    }
)

const Comic = mongoose.model('comics',comicSchema)
export default Comic