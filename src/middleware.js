import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

export async function tratamentoErros(err, req, res, next) {
    if (err instanceof mongoose.Error) {
        const listaErros = Object.values(err.errors)
            .map(erro => erro.message)
            .join('; ')
        res.json({ erro: listaErros })
    } 
    else {
        res.json({ erro: err.message })
    }
}

export async function autenticacao(req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader) {
        next(new Error('Token não providenciado'))
        return
    }

    const [_, token] = authHeader.split(' ')

    try {
        const payload = jwt.verify(token, "chave_secreta")
        req.userId = payload.id
        next()
    } catch {
        next(new Error('Token inválido ou expirado'))
    }
}