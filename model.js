import { Schema, model } from "mongoose"
const UserSchema = new Schema(
    {
        nome: String,
        senha: String,
        perfil: String,
    }
)

export const User = model('User', UserSchema)