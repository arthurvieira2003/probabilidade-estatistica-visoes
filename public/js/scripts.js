google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(getPerMonthDados);
google.charts.setOnLoadCallback(getByCityDados);
google.charts.setOnLoadCallback(getBySateDados);
google.charts.setOnLoadCallback(getByReasonDados);

async function getPerMonthDados() {
  try {
    const resposta = await fetch("http://localhost:3000/GetPerMonth");

    const dadosString = await resposta.text();

    const dados = dadosString.split(";").map(Number);

    const resposta2 = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dados: dados }),
    });

    const dados2 = await resposta2.json();

    document.getElementById("painel4").textContent = JSON.stringify(
      dados2,
      null,
      2
    );

    getPerMonthGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }

  document.getElementById("parametro").value = "";
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
    height: 600,
    hAxis: {
      title: "Mês",
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: { title: "Quantidade" },
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
  data.addColumn("number", "Quantidade");

  for (let cidade in dados) {
    data.addRow([cidade, dados[cidade]]);
  }

  var options = {
    title: "Quantidade por Cidade",
    height: 600,
    hAxis: {
      title: "Cidade",
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: { title: "Quantidade" },
    colors: ["#3FD13D"],
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
  data.addColumn("number", "Quantidade");

  for (let estado in dados) {
    data.addRow([estado, dados[estado]]);
  }

  var options = {
    title: "Quantidade por Estado",
    height: 600,
    hAxis: { title: "Estado" },
    vAxis: { title: "Quantidade" },
    colors: ["D51FEE"],
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
    height: 600,
    hAxis: {
      title: "Mês",
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: { title: "Quantidade" },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

async function getByCityAndMonthDados() {
  try {
    const valorParametro = document.getElementById("parametro").value;

    const resposta = await fetch(
      `http://localhost:3000/GetByCityAndMonth?parametro=${valorParametro}`
    );

    const dadosString = await resposta.text();

    const dados = dadosString.split(";").map(Number);

    getByCityAndMonthGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getByCityAndMonthGrafico(dados) {
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
    height: 600,
    hAxis: {
      title: "Mês",
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: { title: "Quantidade" },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

async function getByReasonDados() {
  try {
    const resposta = await fetch("http://localhost:3000/GetByReason");

    const dadosString = await resposta.text();

    const pares = dadosString.split(";");
    const dados = {};
    for (let par of pares) {
      const [rotulo, medida] = par.split(":");
      dados[rotulo.trim()] = Number(medida);
    }

    getByReasonGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getByReasonGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Tipo de Manutenção");
  data.addColumn("number", "Quantidade");

  for (let tipo in dados) {
    if (dados[tipo] > 0) {
      data.addRow([tipo, dados[tipo]]);
    }
  }

  var options = {
    title: "Quantidades por Tipo de Manutenção",
    height: 900,
    pieSliceText: "percentage",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div4")
  );
  chart.draw(data, options);
}

async function getByCityFiltradoDados() {
  try {
    const valorParametro = document.getElementById("parametro").value;

    const resposta = await fetch("http://localhost:3000/GetByCity");

    const dadosString = await resposta.text();

    const pares = dadosString.split(";");
    const dados = {};
    for (let par of pares) {
      const [cidade, medida] = par.split(":");
      if (cidade.trim().toUpperCase() === valorParametro.trim().toUpperCase()) {
        dados[cidade.trim()] = Number(medida);
      }
    }

    getByCityFiltradoGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getByCityFiltradoGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Cidade");
  data.addColumn("number", "Quantidade");

  for (let cidade in dados) {
    data.addRow([cidade, dados[cidade]]);
  }

  var options = {
    title: "Quantidade por Cidade",
    height: 600,
    hAxis: {
      title: "Cidade",
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: { title: "Quantidade" },
    colors: ["#3FD13D"],
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div2")
  );
  chart.draw(data, options);
}

async function getByStateFiltradoDados() {
  try {
    const valorParametro = document.getElementById("parametro").value;

    const resposta = await fetch("http://localhost:3000/GetBySate");

    const dadosString = await resposta.text();

    const pares = dadosString.split(";");
    const dados = {};
    for (let par of pares) {
      const [cidade, medida] = par.split(":");
      if (cidade.trim().toUpperCase() === valorParametro.trim().toUpperCase()) {
        dados[cidade.trim()] = Number(medida);
      }
    }

    getByStateFiltradoGrafico(dados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

function getByStateFiltradoGrafico(dados) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Estado");
  data.addColumn("number", "Quantidade");

  for (let estado in dados) {
    data.addRow([estado, dados[estado]]);
  }

  var options = {
    title: "Quantidade por Estado",
    height: 600,
    hAxis: { title: "Estado" },
    vAxis: { title: "Quantidade" },
    colors: ["D51FEE"],
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div3")
  );
  chart.draw(data, options);
}
