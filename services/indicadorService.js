import { Indicador } from "../model.js";
import { buscarParametroPorSigla } from "./parametroService.js";

export async function criarIndicador(nome, sigla, valor, descricao) {

if (sigla.toUpperCase() === "IGPUB") {
    const tnse = await buscarParametroPorSigla("TNSE")
    const ngpb = await buscarParametroPorSigla("NGPB")

    if (!tnse || !ngpb)
    
        valor = ngpb / tnse
}

    const indicador = await Indicador.create({
        nome,
        sigla,
        valor,
        descricao,
    })
    return indicador
}

export async function buscarIndicadores() {
    const lista = await Indicador.find();
    return lista;
  }

export async function buscarIndicadorPorId(idIndicador) {
    const indicador = await Indicador.findById(idIndicador)
    return indicador
}

export async function atualizarIndicadorPorId(idIndicador, dadosAtualizados) {
    const indicadorAtualizado = await Indicador.findByIdAndUpdate(
        idIndicador,
        dadosAtualizados,
        { new: true }
    )
    return indicadorAtualizado
}

export async function deletarIndicadorPorId(idIndicador) {
    const indicador = await Indicador.findByIdAndDelete(idIndicador)
    return indicador
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