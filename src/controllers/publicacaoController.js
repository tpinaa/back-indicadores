import express from "express"
import { 
    criarPublicacao,
    buscarPublicacoes,
    buscarPublicacaoPorId,
    atualizarPublicacaoPorId,
    deletarPublicacaoPorId
} from "../services/publicacaoService.js"

const router = express.Router()

//GET todas as publicacoes
router.get('/', async (req, res, next) => {
    try {
        const listaPublicacoes = await buscarPublicacoes()
        res.status(200).json(listaPublicacoes)
    } catch(err) {
        next(err)
    }
})

//GET publicacao por ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const publicacao = await buscarPublicacaoPorId(id)
        if (!publicacao) {
            const notFoundError = new Error(`Publicação com ID ${id} não encontrada.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(200).json(publicacao)
    } catch(err) {
        next(err)
    }
})

//POST criar nova publicacao
router.post('/', async (req, res, next) => {
    const { titulo, dataPublicacao, autor, tipo } = req.body
    try {
        const publicacao = await criarPublicacao(
            titulo,
            dataPublicacao,
            autor,
            tipo
        )
        res.status(201).json(publicacao)
    } catch(err) {
        next(err)
    }
})

//PUT atualizar publicacao por ID
router.put('/:id', async (req, res, next)=> {
    const id = req.params.id
    const { titulo, dataPublicacao, autor, tipo } = req.body
    try {
        const publicacaoAtualizada = await atualizarPublicacaoPorId(
            id,
            {titulo, dataPublicacao, autor, tipo}
        )
        if (!publicacaoAtualizada) {
            const notFoundError = new Error(`Publicação com ${id} não encontrada para atualização`);
            notFoundError.status = 404;
            return next (notFoundError);
        }

        res.status(200).json(publicacaoAtualizada)
    } catch(err) {
        next(err)
    }
})

//DELETE publicacao por ID
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const publicacao = await deletarPublicacaoPorId(id)
        
        if (!publicacao) {
            const notFoundError = new Error(`Publicação com ${id} não encontrada para exclusão.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(204).end()
    } catch(err) {
        next(err)
    }
})

export default router