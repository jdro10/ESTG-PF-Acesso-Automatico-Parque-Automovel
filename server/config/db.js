var Client = require('pg').Client

const client = new Client({
    user: "postgres",
    password: "postgres",
    port: 5432,
    database: "parking_lot_database"
  });
  
client.connect()
.then(() => console.log("Connected successfully to postgresql"))
.catch(e => console.log(e))

module.exports = client;