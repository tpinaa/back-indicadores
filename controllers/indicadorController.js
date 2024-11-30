import express from "express"
import { atualizarIndicadorPorId, buscarIndicadores, buscarIndicadorPorId, criarIndicador, deletarIndicadorPorId } from "../services/indicadorService.js"
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const listaIndicadores = await buscarIndicadores()
        res.json(listaIndicadores)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const indicador = await buscarIndicadorPorId(id)
        res.json(indicador)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res) => {
    const { nome, sigla, valor, descricao } = req.body
    const indicador = await criarIndicador(
        nome,
        sigla,
        valor,
        descricao
    )
    res.json(indicador)
})

router.put('/:id', async (req, res, next)=> {
    const id = req.params.id
    const { nome, sigla, valor, descricao } = req.body
    try {
        const indicadorAtualizado = await atualizarIndicadorPorId(
            id,
            {nome, sigla, valor, descricao}
        )
        res.json(indicadorAtualizado)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const indicador = await deletarIndicadorPorId(id)
        res.json(indicador)
    } catch(err) {
        next(err)
    }
})

export default router