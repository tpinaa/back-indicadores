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
    const parametro = await Parametro.findOne({ sigla: siglaParametro })
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