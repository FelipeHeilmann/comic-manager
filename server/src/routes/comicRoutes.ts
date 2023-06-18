import { Express } from 'express'
import { ComicController } from '../controller/ComicController'

export const comicRoutes = (app: Express) =>{
    app.get('/comics', ComicController.getComics)
    app.post('/newComic', ComicController.createComic)
    app.put('/comic/:id', ComicController.updateComic)
    app.delete('/comic/:id', ComicController.deleteComic)
}