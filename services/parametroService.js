import { Parametro } from "../model.js";

export async function criarParametro(sigla, valor, descricao) {
    const parametro = await Parametro.create({
        sigla,
        valor,
        descricao
    })
    return parametro
}

export async function buscarParametros() {
    const lista = await Parametro.find();
    return lista;
}

export async function buscarParametroPorSigla(siglaParametro) {
    const parametro = await Parametro.find({ $where: { sigla: siglaParametro } })
    return parametro
}

export async function atualizarParametroPorId(idParametro, dadosAtualizados) {
    const parametroAtualizado = await Parametro.findByIdAndUpdate(
        idParametro,
        dadosAtualizados,
        { new: true }
    )
    return parametroAtualizado
}

export async function deletarParametroPorId(idParametro) {
    const parametro = await Parametro.findByIdAndDelete(idParametro)
    return parametro
}

/*
    INDICADORES
    nome : Indice geral de publicaçoes,
    sigla: IGPUB
    descricao: Razão entre NGPB e TNSE
    valor: 76,00
*/

/*
    PARÂMETROS_AMOSTRAIS
    sigla: TNSE
    descrição: número de técnicos de nivel superior vinculados a pesquisa no ano
    (pesquisador, bolsista, tecnologista)
    valor: 653
*/

/*
    PARÂMETROS_AMOSTRAIS
    sigla: NGPB
    descrição: número de publicações no ano
    valor: 13
*/