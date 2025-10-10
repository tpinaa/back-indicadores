import { Indicador } from '../model.js';
import { buscarParametroPorSigla } from './parametroService.js';

export async function criarIndicador(nome, sigla, valor, descricao, parametros) {
  // Cálculo do IGPUB
  let tnse, ngpb;

  try {
  if (sigla.toUpperCase() === 'IGPUB') {
    tnse = await buscarParametroPorSigla('TNSE');
    ngpb = await buscarParametroPorSigla('NGPB');

    //Tratamento de Erro de Lógica (parâmetros ausentes)
    if (!tnse || !ngpb) {
      const erroLogica = new Error('Parâmetros TNSE e/ou NGPB para cálculo do indicador ainda não foram cadastrados.');
      erroLogica.status = 400;
      throw erroLogica;
    }

    //Tratamento de Erro de Lógica (divisão por zero)
    if (tnse.valor === 0) {
      const erroDivisao = new Error('Divisão por zero: O valor do parâmetro TNSE é zero, impedindo o cálculo.');
      erroDivisao.status = 400;
      throw erroDivisao;
    }

    valor = ngpb.valor / tnse.valor;
    parametros = [ngpb,tnse]
  }
  
  //Tratamento de Erro de Mongoose (create/ValidationError/11000)
  const indicador = await Indicador.create({
    nome,
    sigla,
    valor: valor ? valor : 0,
    descricao,
    parametros: parametros ? parametros : [],
  });
  return indicador;
  } catch (error) {
    throw error;
  }
}

//Tratamento de Erro de Mongoose (find/conexão)
export async function buscarIndicadores() {
  try {
    const lista = await Indicador.find().populate('parametros');
    return lista;
  } catch (error) {
    throw error;
  }
}

//Tratamento de Erro de Mongoose (findById/CastError/Conexão)
export async function buscarIndicadorPorId(idIndicador) {
  try {
    const indicador = await Indicador.findById(idIndicador);
    return indicador;
  } catch (error) {
    throw error;
  }
}

//Tratamento de Erro de Mongoose (findByIdAndUpdate/ValidationError/CastError/Conexão)
export async function atualizarIndicadorPorId(
  idIndicador,
  dadosAtualizados
) {
  try {
    const indicadorAtualizado = await Indicador.findByIdAndUpdate(
    idIndicador,
    dadosAtualizados,
    { new: true }
  );
    return indicadorAtualizado;
  } catch (error) {
  throw error;
  }
}

//Tratamento de Erro de Mongoose (findByIdAndDelete/CastError/Conexão)
export async function deletarIndicadorPorId(idIndicador) {
  try {
    const indicador = await Indicador.findByIdAndDelete(idIndicador);
    return indicador;
  } catch (error) {
  throw error;
  }
}