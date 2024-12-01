import { Indicador } from '../model.js';
import { buscarParametroPorSigla } from './parametroService.js';

export async function criarIndicador(nome, sigla, valor, descricao) {
  // Cálculo do IGPUB
  if (sigla.toUpperCase() === 'IGPUB') {
    const tnse = await buscarParametroPorSigla('TNSE');
    const ngpb = await buscarParametroPorSigla('NGPB');

    if (!tnse || !ngpb)
      throw new Error('Parâmetros para cálculo do indicador não foram cadastrados ainda');

    valor = ngpb.valor / tnse.valor;
  }

  const indicador = await Indicador.create({
    nome,
    sigla,
    valor,
    descricao,
  });
  return indicador;
}

export async function buscarIndicadores() {
  const lista = await Indicador.find();
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