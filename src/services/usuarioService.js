import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Usuario } from '../model.js';

//Função para criar erros customizados
function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

//Fator de custo bcrypt
export async function criarUsuario(nome, senha, perfil) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);
    const usuario = await Usuario.create({ nome, senha: hash, perfil });
    return usuario;
  } catch (error) {
    throw error;
  }
}

//Verificação de usuário
export async function autenticarUsuario(nome, senha) {
  try {
    const usuario = await Usuario.findOne({ nome });

    if (!usuario) {
      throw createError('Credenciais inválidas', 401);
    }

    if (!await bcrypt.compare(senha, usuario.senha)) {
      throw createError('Credenciais inválidas', 401);
    }

    //Variável de ambiente para chave secreta
    const secret = process.env.JWT_SECRET || 'chave_secreta_fallback_seguro';
    const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '1h' });
    return { token };
  } catch (error) {
    throw error;
  }
}

export async function buscarUsuarios() {
  try {
    const listaUsuarios = await Usuario.find();
    return listaUsuarios;
  } catch (error) {
    throw error;
  }
}

export async function buscarUsuarioPorId(idUsuario) {
  try {
    const usuario = await Usuario.findById(idUsuario);
    return usuario;
  } catch (error) {
    throw error;
  }
}

export async function deletarUsuarioPorId(idUsuario) {
  try {
    const usuario = await Usuario.findByIdAndDelete(idUsuario);
    return usuario;
  } catch (error) {
    throw error;
  }
}

export async function atualizarUsuarioPorId(idUsuario, dadosAtualizados) {
  try {
    //Se a senha for passada, faz o hash novamente
    if (dadosAtualizados.senha) {
      const salt = await bcrypt.genSalt(10);
      dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, salt);
    }

      const usuarioAtualizado = await Usuario.findByIdAndUpdate(idUsuario, dadosAtualizados, {
        new: true,
        //Garante que as regras dos schemas são aplicadas na atualização
        runValidators: true,
  });
  return usuarioAtualizado;
  } catch (error) {
  throw error;
  }
}