import { Request, Response } from 'express'
import Comic from '../models/comicModel'
import User from '../models/userModel'
import { NotFoundError } from '../helpers/api-error'

interface CustomRequest extends Request{
    auth?: any
}

class ComicController{
    static getComics = async (req: CustomRequest, res: Response) => {
        const { page = 1, limit = 5} = req.query
        const { _id } = req.auth

        const comics = await Comic.find({userId: _id}, { userId: false })
            .skip((Number(page)-1) * Number(limit))
            .limit(Number(limit))
            
        return res.status(200).json({
            comics
        })
    }

    static getComicId = async (req: CustomRequest, res: Response) => {
        const { id } = req.params

        const comic = await Comic.findById({_id: id})

        if(!comic){
            throw new NotFoundError('Quadrinho não encontado')
        }

        return res.status(200).json(comic)
    }

    static createComic = async (req: CustomRequest, res: Response) => {
        const { title, issueNumber, publication_year, coverUrl ,isComplete, company,  author, artist, isHardCover } = req.body
        const { _id } = req.auth
        
        const comic = new Comic({
            title, 
            issueNumber, 
            publication_year, 
            isComplete, 
            author, 
            artist, 
            isHardCover,
            company, 
            coverUrl,
            userId: _id
        })
            
        await comic.save()
        return res.status(201).json({
            comic
        })

        
    }

    static updateComic = async (req: CustomRequest, res: Response) => {
        const { id } = req.params
        
        const comic = Comic.findById({_id: id})

        if(!comic){
            throw new NotFoundError('Quadrinho não encontrado')
        }

        await Comic.updateOne({_id: id}, {$set: req.body})
        return res.status(200).send()
        
    }

    static deleteComic = async (req: CustomRequest, res: Response) => {
        const { id } = req.params
        
        const comic = Comic.findById({id})

        if(!comic){
            throw new NotFoundError('Quadrinho não encontrado')
        }
        
        await Comic.deleteOne({_id: id})

        return res.status(200).send()
    }
        

}

export { ComicController }