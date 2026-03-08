# Order API

API REST desenvolvida em **Node.js** e **Express** para gerenciamento de pedidos, com armazenamento em **MongoDB**.

Este projeto foi desenvolvido como parte de um teste técnico e implementa operações completas de CRUD com transformação de dados (mapping) antes da persistência no banco.

---

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seuusuario/order-api-node.git

```

Entre na pasta do projeto:

cd order-api-node

Instale as dependências:

npm install
Configuração

Crie um arquivo .env baseado no .env.example.

Exemplo:

MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/ordersdb
PORT=3000

Executar o projeto
node server.js


A API será iniciada em:

http://localhost:3000
Estrutura do Projeto
.
├── server.js
├── db.js
├── package.json
├── .env.example
└── README.md

Rotas da API
Criar pedido

POST /order

Exemplo de body recebido:

{
"numeroPedido": "v10089015vdb-01",
"valorTotal": 10000,
"dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
"items": [
{
"idItem": "2434",
"quantidadeItem": 1,
"valorItem": 1000
}
]
}

Os dados são transformados antes de serem salvos no banco:

{
"orderId": "v10089015vdb-01",
"value": 10000,
"creationDate": "2023-07-19T12:24:11.529Z",
"items": [
{
"productId": 2434,
"quantity": 1,
"price": 1000
}
]
}
Listar pedidos

GET /order/list

Buscar pedido

GET /order/:id

Atualizar pedido

PUT /order/:id

Remover pedido

DELETE /order/:id

