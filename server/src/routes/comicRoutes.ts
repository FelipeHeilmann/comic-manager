import { Express } from 'express'
import { ComicController } from '../controller/ComicController'
import { validateToken } from '../middleware/jwt'

export const comicRoutes = (app: Express) =>{
    app.get('/comics', validateToken, ComicController.getComics)
    app.post('/newComic', validateToken, ComicController.createComic)
    app.put('/comic/:id', validateToken, ComicController.updateComic)
    app.delete('/comic/:id', validateToken, ComicController.deleteComic)
}