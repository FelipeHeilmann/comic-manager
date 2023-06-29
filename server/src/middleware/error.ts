import { Request, Response , } from 'express'
import { ApiError } from '../helpers/api-error'

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Erro interno'
    return res.status(statusCode).json({statusCode, message})
}