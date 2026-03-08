require("dotenv").config();
const express = require("express");
const { connectToDatabase } = require("./db");

const app = express();
app.use(express.json());

let db;

// Conectar ao MongoDB e iniciar servidor
connectToDatabase()
  .then((database) => {
    db = database;

    app.listen(3000, () => {
      console.log("API rodando na porta 3000 e conectada ao MongoDB");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Rota usada apenas para testes locais
// app.get("/create-test", async (req, res) => {
//   try {
//     const order = {
//       orderId: "v10089015vdb-01",
//       value: 10000,
//       creationDate: new Date(),
//       items: [
//         {
//           productId: 2434,
//           quantity: 1,
//           price: 1000,
//         },
//       ],
//     };

//     await db.collection("orders").insertOne(order);

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: "Erro ao criar pedido de teste" });
//   }
// });

/*
POST /order
Cria um pedido com transformação de dados (mapping)
*/
app.post("/order", async (req, res) => {
  try {
    const data = req.body;

    const order = {
      orderId: data.numeroPedido,
      value: data.valorTotal,
      creationDate: new Date(data.dataCriacao),
      items: data.items.map((item) => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem,
      })),
    };

    await db.collection("orders").insertOne(order);

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar pedido" });
  }
});

/*
GET /order/list
Lista todos os pedidos
*/
app.get("/order/list", async (req, res) => {
  try {
    const orders = await db.collection("orders").find().toArray();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar pedidos" });
  }
});

/*
GET /order/:id
Busca pedido pelo orderId
*/
app.get("/order/:id", async (req, res) => {
  try {
    const order = await db
      .collection("orders")
      .findOne({ orderId: req.params.id });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar pedido" });
  }
});

/*
PUT /order/:id
Atualiza pedido
*/
app.put("/order/:id", async (req, res) => {
  try {
    const result = await db
      .collection("orders")
      .findOneAndUpdate(
        { orderId: req.params.id },
        { $set: req.body },
        { returnDocument: "after" }
      );

    if (!result.value) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json(result.value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
});

/*
DELETE /order/:id
Remove pedido
*/
app.delete("/order/:id", async (req, res) => {
  try {
    const result = await db
      .collection("orders")
      .deleteOne({ orderId: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar pedido" });
  }
});
