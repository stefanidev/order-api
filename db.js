const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB");
    return client.db("ordersdb");
  } catch (err) {
    console.error("Erro ao conectar:", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
