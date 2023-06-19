import { Express } from 'express'
import { ComicController } from '../controller/ComicController'
import { validateToken } from '../middleware/jwt'

export const comicRoutes = (app: Express) =>{
    app.get('/comics', validateToken, ComicController.getComics)
    app.post('/newComic', ComicController.createComic)
    app.put('/comic/:id', ComicController.updateComic)
    app.delete('/comic/:id', ComicController.deleteComic)
}