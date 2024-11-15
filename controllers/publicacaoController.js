import express from "express"
import { criarPublicacao } from "../services/publicacaoService.js"
const router = express.Router()

router.post('/', async (req, res) => {
    const {
        titulo,
        projeto,
        situacao,
        dataRegistro,
        dataPublicacao,
        autor,
        tipo,
        classificacao } = req.body
    const publicacao = await criarPublicacao(
        titulo,
        projeto,
        situacao,
        dataRegistro,
        dataPublicacao,
        autor,
        tipo,
        classificacao)
    res.json(publicacao)
})

export default router