const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { ethers } = require("ethers");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = client.db("splitmonie-injective-db");

const provider = new ethers.providers.JsonRpcProvider(
  "https://inevm-rpc.caldera.dev"
);

const splitMonieContract = require("../blockend/deployments/inEVM/SplitMoney.json");

const splitMonie = new ethers.Contract(
  splitMonieContract.address,
  splitMonieContract.abi,
  provider
);

splitMonie.on("*", async (event) => {
  await db
    .collection("events")
    .insertOne({ ...event, timestamp: new Date(), chainId: 1738 });
  console.log(event);
});

app.listen(port, () => {
  client
    .connect()
    .then(() =>
      console.log(`App listening at http://localhost:${port}`)
    );
});
