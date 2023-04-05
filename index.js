
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
    const mostViewCollection = client.db('prolog').collection('mostview');
    app.get('/mostviews', async(req, res) => {
      let query = {};
      const data = await mostViewCollection.find(query).toArray();
      res.send(data);
    })

  }
  finally{

  }
}
run().catch(error => console.error(error))


app.get('/', async (req, res) => {
  res.send('Prolog Running!')
})

app.listen(port, () => {
  console.log(`Prolog app listening on port ${port}`)
})