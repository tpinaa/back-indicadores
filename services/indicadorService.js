import { Indicador } from "../model.js";

export async function criarIndicador(nome,
    formula,
    unidade,
    descricao,
    objetivo,
    observacao,
    justificativa,
    comprovacao,
    fonte){
    const indicador = await Indicador.create({nome,
        formula,
        unidade,
        descricao,
        objetivo,
        observacao,
        justificativa,
        comprovacao,
        fonte})
    return indicador
}