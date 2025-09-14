import express from "express"
import { 
    criarPublicacao,
    buscarPublicacoes,
    buscarPublicacaoPorId,
    atualizarPublicacaoPorId,
    deletarPublicacaoPorId
} from "../services/publicacaoService.js"
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const listaPublicacoes = await buscarPublicacoes()
        res.json(listaPublicacoes)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const publicacao = await buscarPublicacaoPorId(id)
        res.json(publicacao)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const { titulo, dataPublicacao, autor, tipo } = req.body
    try {
        const publicacao = await criarPublicacao(
            titulo,
            dataPublicacao,
            autor,
            tipo
        )
        res.json(publicacao)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next)=> {
    const id = req.params.id
    const { titulo, dataPublicacao, autor, tipo } = req.body
    try {
        const publicacaoAtualizada = await atualizarPublicacaoPorId(
            id,
            {titulo, dataPublicacao, autor, tipo}
        )
        res.json(publicacaoAtualizada)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const publicacao = await deletarPublicacaoPorId(id)
        res.json(publicacao)
    } catch(err) {
        next(err)
    }
})

export default router