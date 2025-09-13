import { Indicador } from '../model.js';
import { buscarParametroPorSigla } from './parametroService.js';

export async function criarIndicador(nome, sigla, valor, descricao, parametros) {
  // Cálculo do IGPUB
  let tnse, ngpb;

  if (sigla.toUpperCase() === 'IGPUB') {
    tnse = await buscarParametroPorSigla('TNSE');
    ngpb = await buscarParametroPorSigla('NGPB');

    if (!tnse || !ngpb)
      throw new Error(
        'Parâmetros para cálculo do indicador não foram cadastrados ainda'
      );

    valor = ngpb.valor / tnse.valor;
    parametros = [ngpb,tnse]
  }
  
  const indicador = await Indicador.create({
    nome,
    sigla,
    // Ternário
    valor: valor ? valor : 0,
    descricao,
    parametros: parametros ? parametros : [],
  });
  return indicador;
}

export async function buscarIndicadores() {
  const lista = await Indicador.find().populate('parametros');
  return lista;
}

export async function buscarIndicadorPorId(idIndicador) {
  const indicador = await Indicador.findById(idIndicador);
  return indicador;
}

export async function atualizarIndicadorPorId(
  idIndicador,
  dadosAtualizados
) {
  const indicadorAtualizado = await Indicador.findByIdAndUpdate(
    idIndicador,
    dadosAtualizados,
    { new: true }
  );
  return indicadorAtualizado;
}

export async function deletarIndicadorPorId(idIndicador) {
  const indicador = await Indicador.findByIdAndDelete(idIndicador);
  return indicador;
}