import { Request, Response } from 'express'
import Comic from '../models/comicModel'
import User from '../models/userModel'
import { NotFoundError } from '../helpers/api-error'

interface CustomRequest extends Request{
    auth?: any

}

class ComicController{
    static getComics = async (req: CustomRequest, res: Response) => {
        const { _id } = req.auth

        const comic = await User.find({_id}, {_id: false, email: false, created_at: false, name: false}).select(['comics']).populate('comics')
        return res.status(200).json({
            comic
        })
    }

    static getComicId = async (req: CustomRequest, res: Response) => {
        const { _id } = req.auth
        const { id } = req.params

        const comic = await User.findById(_id, {_id: false, email: false, created_at: false, name: false}).select(['comics']).populate({
            path: 'comics',
            match: { _id: id }, 
        }) 

        if(!comic){
            throw new NotFoundError('Quadrinho não encontado')
        }

        return res.json(comic)
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
            coverUrl
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

    static updateComic = async (req: Request, res: Response) => {
        const { id } = req.params
        
        const comic = Comic.findById({id})

        if(!comic){
            throw new NotFoundError('Quadrinho não encontrado')
        }

        await Comic.updateOne({_id: id}, {$set: req.body})
        return res.status(200).send()
        
    }

    static deleteComic = async (req: CustomRequest, res: Response) => {
        const { _id } = req.auth
        const { id } = req.params
        
        const comic = Comic.findById({id})

        if(!comic){
            throw new NotFoundError('Quadrinho não encontrado')
        }
        
        await Promise.all([
            Comic.deleteOne({_id: id}),
            User.updateOne({_id}, {$pull: {comics: id}})
        ])
        return res.status(200).send()
    }
        

}

export { ComicController }