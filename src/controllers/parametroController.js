import express from "express"
import { atualizarParametroPorId, buscarParametroPorSigla, buscarParametros, criarParametro, deletarParametroPorId } from "../services/parametroService.js"
const router = express.Router()

//Buscar todos os parametros
router.get('/', async (req, res, next) => {
    try {
        const listaParametro = await buscarParametros()
        res.status(200).json(listaParametro)
    } catch (err) {
        next(err)
    }
})

//Buscar parametro por sigla
router.get('/:sigla', async (req, res, next) => {
    const sigla = req.params.sigla
    try {
        const parametro = await buscarParametroPorSigla(sigla)

        //Trata 404 Not Found
        if (!parametro) {
            const notFoundError = new Error(`Parâmetro com sigla ${sigla} não encontrado.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(200).json(parametro)
    } catch (err) {
        next(err)
    }
})

//Criar novo parametro
router.post('/', async (req, res) => {
    const { sigla, valor, descricao } = req.body
    try {
        const parametro = await criarParametro(
            sigla,
            valor,
            descricao
        )
        res.status(201).json(parametro)
    } catch (err) {
        next(err)
    }
})

//Atualizar parametros por ID
router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { sigla, valor, descricao } = req.body
    try {
        const parametroAtualizado = await atualizarParametroPorId(
            id,
            { sigla, valor, descricao }
        )

        //Trata 404 Not Found
        if (!parametroAtualizado) {
            const notFoundError = new Error(`Parâmetro com ID ${id} não encontrado para atualização.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(200).json(parametroAtualizado)
    } catch (err) {
        next(err)
    }
})

//Deletar parametro por ID
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const parametro = await deletarParametroPorId(id)

        if (!parametro) {
            const notFoundError = new Error(`Parâmetro com ID ${id} não encontrado para exclusão.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }
        
        res.status(204).end();
    } catch (err) {
        next(err)
    }
})

export default router