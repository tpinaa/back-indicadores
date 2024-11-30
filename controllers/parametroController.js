import express from "express"
import { atualizarParametroPorId, buscarParametroPorSigla, buscarParametros, criarParametro, deletarParametroPorId } from "../services/parametroService.js"
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const listaParametro = await buscarParametros()
        res.json(listaParametro)
    } catch (err) {
        next(err)
    }
})

router.get('/:sigla', async (req, res, next) => {
    const sigla = req.params.sigla
    try {
        const parametro = await buscarParametroPorSigla(sigla)
        res.json(parametro)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res) => {
    const { sigla, valor, descricao } = req.body
    const parametro = await criarParametro(
        sigla,
        valor,
        descricao
    )
    res.json(parametro)
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { sigla, valor, descricao } = req.body
    try {
        const parametroAtualizado = await atualizarParametroPorId(
            id,
            { sigla, valor, descricao }
        )
        res.json(parametroAtualizado)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const parametro = await deletarParametroPorId(id)
        res.json(parametro)
    } catch (err) {
        next(err)
    }
})

export default router