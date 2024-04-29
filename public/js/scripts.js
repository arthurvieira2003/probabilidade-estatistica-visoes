google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(getPerMonthDados);
google.charts.setOnLoadCallback(getByCityDados);
google.charts.setOnLoadCallback(getBySateDados);

async function getPerMonthDados() {
  try {
    const resposta = await fetch("http://localhost:3000/GetPerMonth");

    const dadosString = await resposta.text();

    const dados = dadosString.split(";").map(Number);

    getPerMonthGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getPerMonthGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Mês");
  data.addColumn("number", "Quantidade");

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  for (let i = 0; i < dados.length; i++) {
    data.addRow([meses[i], dados[i]]);
  }

  var options = {
    title: "Quantidade por Mês",
    width: 1200,
    height: 300,
    hAxis: { title: "Mês" },
    vAxis: { title: "Quantidade", viewWindow: { max: 1100 } },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

async function getByCityDados() {
  try {
    const resposta = await fetch("http://localhost:3000/GetByCity");

    const dadosString = await resposta.text();

    const pares = dadosString.split(";");
    const dados = {};
    for (let par of pares) {
      const [cidade, medida] = par.split(":");
      dados[cidade.trim()] = Number(medida);
    }

    getByCityGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getByCityGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Cidade");
  data.addColumn("number", "Medição");

  for (let cidade in dados) {
    data.addRow([cidade, dados[cidade]]);
  }

  var options = {
    title: "Quantidade por Cidade",
    width: 1900,
    height: 600,
    hAxis: { title: "Cidade", textPosition: "none" },
    vAxis: { title: "Quantidade", viewWindow: { max: 520 } },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div2")
  );
  chart.draw(data, options);
}

async function getBySateDados() {
  try {
    const resposta = await fetch("http://localhost:3000/GetBySate");

    const dadosString = await resposta.text();

    const pares = dadosString.split(";");
    const dados = {};
    for (let par of pares) {
      const [estado, medida] = par.split(":");
      dados[estado.trim()] = Number(medida);
    }

    getBySateGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getBySateGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Estado");
  data.addColumn("number", "Medição");

  for (let estado in dados) {
    data.addRow([estado, dados[estado]]);
  }

  var options = {
    title: "Quantidade por Estado",
    width: 800,
    height: 600,
    hAxis: { title: "Estado" },
    vAxis: { title: "Quantidade" },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div3")
  );
  chart.draw(data, options);
}

async function getByStateAndMonthDados() {
  try {
    const valorParametro = document.getElementById("parametro").value;

    const resposta = await fetch(
      `http://localhost:3000/GetByStateAndMonth?parametro=${valorParametro}`
    );

    const dadosString = await resposta.text();

    const dados = dadosString.split(";").map(Number);

    getByStateAndMonthGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getByStateAndMonthGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Mês");
  data.addColumn("number", "Quantidade");

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  for (let i = 0; i < dados.length; i++) {
    data.addRow([meses[i], dados[i]]);
  }

  var options = {
    title: "Quantidade por Mês",
    width: 1200,
    height: 300,
    hAxis: { title: "Mês" },
    vAxis: { title: "Quantidade", viewWindow: { max: 1100 } },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
