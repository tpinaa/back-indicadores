import { Parametro } from "../model.js";

//Tratamento de Erro Moongoose (create/ValidationError/11000)
export async function criarParametro(sigla, valor, descricao) {
    try {
        const parametro = await Parametro.create({
        sigla,
        valor,
        descricao
    })
    return parametro
    } catch (error) {
    throw (error);
    }
}

//Tratamento de Erro Mongoose (find/conexão)
export async function buscarParametros() {
   try {
    const lista = await Parametro.find();
    return lista;
   } catch (error) {
    throw (error);
   }
}

//Tratamento de Erro Mongoose (findOne/conexão)
export async function buscarParametroPorSigla(siglaParametro) {
   try {
    const parametro = await Parametro.findOne({ sigla: siglaParametro })
    return parametro;
   } catch (error) {
        throw (error);
   }
}

//Tratamento de Erro Mongoose (findByIdAndUpdate/ValidationError/CastError/Conexão)
export async function atualizarParametroPorId(idParametro, dadosAtualizados) {
    try {
        const parametroAtualizado = await Parametro.findByIdAndUpdate(
        idParametro,
        dadosAtualizados,
        { new: true }
    )
    return parametroAtualizado
    } catch (error) {
        throw (error);
    }
}

//Tratamento de Erro Mongoose (findByIdAndDelete/CastError/Conexão)
export async function deletarParametroPorId(idParametro) {
    try{
        const parametro = await Parametro.findByIdAndDelete(idParametro)
        return parametro
    } catch (error) {
        throw (error);
    }
}