import mongoose from "mongoose"
import app from "./app.js"
const port = 3000

main().catch(err => console.log('Erro ao conectar com o banco de dados'));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/cetem-db');

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
}