import mongoose from "mongoose"
import app from "./app.js"

const port = 3000

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("Erro de conexão do Mongoose após a inicialização:", err);
});

db.once("open", () => {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

main().catch(err => {
  console.error('Erro ao conectar-se com o banco de dados.', err);
  process.exit(1);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/cetem-db');

    const server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

    server.on('error', (err) => {
      console.error('Erro ao iniciar o servidor Express:', err);
      process.exit(1);
    });
}