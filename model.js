import { Schema, model } from "mongoose"

const UsuarioSchema = new Schema(
    {
        nome: {
            type: String,
            required: [true, 'Insira um nome']
        },
        senha: {
            type: String,
            minLength: [6, 'Senha deve conter no mínimo 6 caracteres']
        },
        perfil: String,
    }
)

export const Usuario = model('Usuario', UsuarioSchema)

const IndicadorSchema = new Schema(
    {
        nome: String,
        sigla: String,
        valor: Number,
        descricao: String,
        parametros: [{ type: Schema.Types.ObjectId, ref: 'Parametro' }]
    }
)

export const Indicador = model('Indicador', IndicadorSchema)

const PublicacaoSchema = new Schema(
    {
        titulo: String,
        dataPublicacao: Date,
        autor: String,
        tipo: String
    }
)

export const Publicacao = model('Publicacao', PublicacaoSchema)

const ParametroSchema = new Schema(
    {
        sigla: String,
        descricao: String,
        valor: Number
    }
)

export const Parametro = model('Parametro', ParametroSchema)