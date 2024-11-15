import express from "express"
import { criarIndicador } from "../services/indicadorService.js"
const router = express.Router()

router.post('/', async (req, res) => {
    const {
        nome,
        formula,
        unidade,
        descricao,
        objetivo,
        observacao,
        justificativa,
        comprovacao,
        fonte} = req.body
    const indicador = await criarIndicador(
        nome,
        formula,
        unidade,
        descricao,
        objetivo,
        observacao,
        justificativa,
        comprovacao,
        fonte)
    res.json(indicador)
})

export default router