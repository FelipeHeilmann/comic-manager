import { Request, Response } from 'express'
import Comic from '../models/comicModel'

class ComicController{
    static getComics = async (req: Request, res: Response) => {
        const comics = await Comic.find()
        return res.status(200).json({
            comics
        })
    }

    static createComic = async (req: Request, res: Response) => {
        const { tile, issueNumber, publication_year, isComplete, author, artist, isHardCover } = req.body

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

            await comic.save()
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

    static deleteComic = async (req: Request, res: Response) => {
        const { id } = req.params
        try{
            await Comic.deleteOne({_id: id})
            return res.status(200).send()
        }
        catch(err){
            res.status(500).json({err})
        }
    }
}

export { ComicController }