import { Publicacao } from '../model.js';

//Tratamento de Erros Mongoose (Atualizacao/Validacao/Duplicidade)
export async function criarPublicacao(titulo, dataPublicacao, autor, tipo) {
  try {
    const publicacao = await Publicacao.create({
    titulo,
    dataPublicacao,
    autor,
    tipo,
  });
  return publicacao;
  } catch (error) {
    throw (error);
  }
}

//Tratamento de Erros Mongoose (Busca/Conexão)
export async function buscarPublicacoes() {
  try {
    const lista = await Publicacao.find();
    return lista;
  } catch (error) {
    throw (error);
  }
}

//Tratamento de Erro Mongoose (buscaID/CastError)
export async function buscarPublicacaoPorId(idPublicacao) {
  try {
    const publicacao = await Publicacao.findById(idPublicacao);
    return publicacao;
  } catch (error) {
    throw (error);
  }
}

//Tratamento de Erro Mongoose (Atualizacao/Validacao/CastError)
export async function atualizarPublicacaoPorId(idPublicacao, dadosAtualizados) {
   try {
      const publicacaoAtualizada = await Publicacao.findByIdAndUpdate(
        idPublicacao,
        dadosAtualizados,
        { new: true }
      )
      return publicacaoAtualizada;
   } catch (error) {
    throw (error);
   }
}

//Tratamento de Erro Mongoose (Exclusao/CastError)
export async function deletarPublicacaoPorId(idPublicacao) {
  try{
    const publicacao = await Publicacao.findByIdAndDelete(idPublicacao);
    return publicacao;
  } catch (error) {
    throw (error);
  }
}