process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile("capa.html", { root: path.join(__dirname, "public/html") });
});

app.get("/js/scripts.js", (req, res) => {
  res.sendFile("scripts.js", { root: path.join(__dirname, "public/js") });
});

app.get("/GetPerMonth", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/GetPerMonth"
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.get("/GetByCity", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/GetByCity"
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.get("/GetBySate", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/GetBySate"
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.get("/GetByStateAndMonth", async (req, res) => {
  try {
    const valorParametro = req.query.parametro;

    const resposta = await axios.get(
      `https://glad-reliably-lion.ngrok-free.app/TechVisits/GetByStateAndMonth?state=${valorParametro}`
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.get("/GetByCityAndMonth", async (req, res) => {
  try {
    const valorParametro = req.query.parametro;

    const resposta = await axios.get(
      `https://glad-reliably-lion.ngrok-free.app/TechVisits/GetByCityAndMonth?city=${valorParametro}`
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.get("/GetByReason", async (req, res) => {
  try {
    const resposta = await axios.get(
      `https://glad-reliably-lion.ngrok-free.app/TechVisits/GetByReason`
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.post("/Estatisticas", async (req, res) => {
  try {
    const dados = req.body;

    const resposta = await axios.post(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/Estatisticas",
      dados
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("Erro ao buscar os dados: " + erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.post("/CalcularVariancias", async (req, res) => {
  try {
    const dados = req.body;

    const resposta = await axios.post(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/CalcularVariancias",
      dados
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("Erro ao buscar os dados: " + erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.post("/CalcularDesvios", async (req, res) => {
  try {
    const dados = req.body;

    const resposta = await axios.post(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/CalcularDesvios",
      dados
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("Erro ao buscar os dados: " + erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.post("/Coeficiente", async (req, res) => {
  try {
    const dados = req.body;

    const resposta = await axios.post(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/Coeficiente",
      dados
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("Erro ao buscar os dados: " + erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.post("/Amplitude", async (req, res) => {
  try {
    const dados = req.body;

    const resposta = await axios.post(
      "https://glad-reliably-lion.ngrok-free.app/TechVisits/Amplitude",
      dados
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("Erro ao buscar os dados: " + erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.get("/GetPerReasonsMonths", async (req, res) => {
  try {
    const valorParametro = req.query.motivo;

    const resposta = await axios.get(
      `https://glad-reliably-lion.ngrok-free.app/TechVisits/GetPerReasonsMonths?motivo=${valorParametro}`
    );

    res.send(resposta.data);
  } catch (erro) {
    console.error("deu ruim aqui man: " + erro);
    res.status(500).send("erro no servidor man");
  }
});

app.listen(3000, () => {
  console.log("on na 3000");
});
