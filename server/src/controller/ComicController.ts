import { Request, Response } from 'express'
import Comic from '../models/comicModel'
import User from '../models/userModel'

interface CustomRequest extends Request{
    auth?: any

}

class ComicController{
    static getComics = async (req: CustomRequest, res: Response) => {
        const { _id } = req.auth

        const comic = await User.find({_id}, {_id: false,email: false}).select(['comics', 'name', 'created_at']).populate('comics')
        return res.status(200).json({
            comic
        })
    }

    static createComic = async (req: CustomRequest, res: Response) => {
        const { tile, issueNumber, publication_year, isComplete, author, artist, isHardCover } = req.body
        const { _id } = req.auth

        try{
            const comic = new Comic({
                tile, 
                issueNumber, 
                publication_year, 
                isComplete, 
                author, 
                artist, 
                isHardCover
            })
            
            await Promise.all(
                [
                    comic.save(), User.updateOne({_id}, {$push:{
                        comics: comic._id
                    }})
        
                ]
            ) 
            return res.status(201).json({
                comic
            })

        }
        catch(err){
            return res.status(500).json({err})
        }
    }

    static updateComic = async (req: Request, res: Response) => {
        const { id } = req.params
        try{
            await Comic.updateOne({_id: id}, {$set: req.body})
            return res.status(200).send()
        }
        catch(err){
            res.status(500).json({err})
        }
    }

    static deleteComic = async (req: CustomRequest, res: Response) => {
        const { _id } = req.auth
        const { id } = req.params
        try{
            await Promise.all([
                Comic.deleteOne({_id: id}),
                User.updateOne({_id}, {$pull: {comics: id}})
            ])
            return res.status(200).send()
        }
        catch(err){
            res.status(500).json({err})
        }
    }
}

export { ComicController }