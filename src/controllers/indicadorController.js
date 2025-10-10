import express from "express"
import { atualizarIndicadorPorId, buscarIndicadores, buscarIndicadorPorId, criarIndicador, deletarIndicadorPorId } from "../services/indicadorService.js"

//Criar indicador
export const criarIndicadorHandler = async (req, res, next) => {
    const { nome, sigla, valor, descricao, parametros } = req.body;

    try {
        const indicador = await criarIndicador(nome, sigla, valor, descricao, parametros);
        
        res.status(201).json({
            status: 'success',
            data: indicador,
            message: 'Indicador criado com sucesso.'
        });
    } catch (error) {
        next (error);
    }
};

//Buscar indicadores
export const buscarIndicadoresHandler = async (req, res, next) => {
    try {
        const lista = await buscarIndicadores();

        res.status(200).json({
            status: 'success',
            data: lista,
            message: 'Lista de indicadores recuperada com sucesso.'
        });
    } catch (error) {
        next(error);
    }
};

//Buscar por ID
export const buscarIndicadorPorIdHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const indicador = await buscarIndicadorPorId(id);

        if (!indicador) {
            const notFoundError = new Error(`Indicador com ID ${id} não encontrado.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(200).json({
            status: 'success',
            data: indicador,
            message: 'Indicador recuperado com sucesso.'
        });
    } catch (error) {
        next (error);
    }
};

//Atualizar por ID
export const atualizarIndicadorPorIdHandler = async (req, res, next) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const indicadorAtualizado = await atualizarIndicadorPorId(id, dadosAtualizados);
        
        if (!indicadorAtualizado) {
            const notFoundError = new Error(`Indicador com ID ${id} não encontrado para atualização.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(200).json ({
            status: 'success',
            data: indicadorAtualizado,
            message: 'Indicador atualizado com sucesso.'
        });
    } catch (error) {
        next(error);
    }
}

//Deletar por ID
export const deletarIndicadorPorIdHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const indicador = await deletarIndicadorPorId(id);

        if (!indicador) {
            const notFoundError = new Error(`Indicador com ID ${id} não encontrado para exclusão.`);
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.status(204).json({
            status: 'success',
            data: null,
            message: 'Indicador excluído com sucesso.'
        });
    } catch (error) {
        next(error);
    }
}

const router = express.Router()

router.get('/', buscarIndicadoresHandler)
router.get('/:id', buscarIndicadorPorIdHandler)
router.post('/', criarIndicadorHandler)
router.put('/:id', atualizarIndicadorPorIdHandler)
router.delete('/:id', deletarIndicadorPorIdHandler)

export default router