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

    const modeMediaMediana = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados2 = await modeMediaMediana.json();

    const variancias = await fetch("http://localhost:3000/CalcularVariancias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados3 = await variancias.json();

    const desvios = await fetch("http://localhost:3000/CalcularDesvios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados4 = await desvios.json();

    const coeficiente = await fetch("http://localhost:3000/Coeficiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados5 = await coeficiente.json();

    const amplitude = await fetch("http://localhost:3000/Amplitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados6 = await amplitude.json();

    getPerMonthGrafico(dados);

    const resultados = {
      modeMediaMediana: dados2,
      variancias: dados3,
      desvios: dados4,
      coeficiente: dados5,
      amplitude: dados6,
    };

    // Chame atualizarPainel1() com os resultados
    atualizarPainel1(resultados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }

  document.getElementById("parametro").value = "";
}

async function atualizarPainel1(resultados) {
  // Agora resultados é passado como um argumento para a função

  const painel = document.getElementById("painel1");
  painel.innerHTML = `
    <strong>Media:</strong> ${resultados.modeMediaMediana.media} <br>
    <strong>Moda:</strong> ${
      resultados.modeMediaMediana.moda !== null
        ? resultados.modeMediaMediana.moda
        : "Não possui"
    } <br> 
    <strong>Mediana:</strong> ${resultados.modeMediaMediana.mediana} <br> <br>
    <strong>Variância Amostral:</strong> ${
      resultados.variancias.varianciaA
    } <br>
    <strong>Variância Populacional:</strong> ${
      resultados.variancias.varianciaP
    } <br> <br>
    <strong>Desvio Padrão Populacional:</strong> ${
      resultados.desvios.desvioP
    } <br>
    <strong>Desvio Padrão Amostral:</strong> ${
      resultados.desvios.desvioA
    } <br> <br>
    <strong>Coeficiente Amostral:</strong> ${
      resultados.coeficiente.amostral
    } <br>
    <strong>Coeficiente Populacional:</strong> ${
      resultados.coeficiente.populacional
    } <br> <br>
    <strong>Amplitude:</strong> ${resultados.amplitude.amplitude}
  `;
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
    const numeros = [];
    for (let par of pares) {
      const [cidade, medida] = par.split(":");
      dados[cidade.trim()] = Number(medida);
      numeros.push(Number(medida));
    }

    const numerosArray = numeros.map(Number);

    const modeMediaMediana = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numerosArray),
    });

    const dados2 = await modeMediaMediana.json();

    const variancias = await fetch("http://localhost:3000/CalcularVariancias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numerosArray),
    });

    const dados3 = await variancias.json();

    const desvios = await fetch("http://localhost:3000/CalcularDesvios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numerosArray),
    });

    const dados4 = await desvios.json();

    const coeficiente = await fetch("http://localhost:3000/Coeficiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numerosArray),
    });

    const dados5 = await coeficiente.json();

    const amplitude = await fetch("http://localhost:3000/Amplitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numerosArray),
    });

    const dados6 = await amplitude.json();

    getByCityGrafico(dados);

    const resultados = {
      modeMediaMediana: dados2,
      variancias: dados3,
      desvios: dados4,
      coeficiente: dados5,
      amplitude: dados6,
    };

    console.log(resultados);

    atualizarPainel2(resultados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

async function atualizarPainel2(resultados) {
  const painel = document.getElementById("painel2");
  painel.innerHTML = `
    <strong>Media:</strong> ${resultados.modeMediaMediana.media} <br>
    <strong>Moda:</strong> ${
      resultados.modeMediaMediana.moda !== null
        ? resultados.modeMediaMediana.moda
        : "Não possui"
    } <br> 
    <strong>Mediana:</strong> ${resultados.modeMediaMediana.mediana} <br> <br>
    <strong>Variância Amostral:</strong> ${
      resultados.variancias.varianciaA
    } <br>
    <strong>Variância Populacional:</strong> ${
      resultados.variancias.varianciaP
    } <br> <br>
    <strong>Desvio Padrão Populacional:</strong> ${
      resultados.desvios.desvioP
    } <br>
    <strong>Desvio Padrão Amostral:</strong> ${
      resultados.desvios.desvioA
    } <br> <br>
    <strong>Coeficiente Amostral:</strong> ${
      resultados.coeficiente.amostral
    } <br>
    <strong>Coeficiente Populacional:</strong> ${
      resultados.coeficiente.populacional
    } <br> <br>
    <strong>Amplitude:</strong> ${resultados.amplitude.amplitude}
  `;
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
    const numeros = [];
    for (let par of pares) {
      const [estado, medida] = par.split(":");
      dados[estado.trim()] = Number(medida);
      numeros.push(Number(medida));
    }

    const modeMediaMediana = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados2 = await modeMediaMediana.json();

    const variancias = await fetch("http://localhost:3000/CalcularVariancias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados3 = await variancias.json();

    const desvios = await fetch("http://localhost:3000/CalcularDesvios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados4 = await desvios.json();

    const coeficiente = await fetch("http://localhost:3000/Coeficiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados5 = await coeficiente.json();

    const amplitude = await fetch("http://localhost:3000/Amplitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados6 = await amplitude.json();

    getBySateGrafico(dados);

    const resultados = {
      modeMediaMediana: dados2,
      variancias: dados3,
      desvios: dados4,
      coeficiente: dados5,
      amplitude: dados6,
    };

    atualizarPainel3(resultados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

async function atualizarPainel3(resultados) {
  const painel = document.getElementById("painel3");
  painel.innerHTML = `
    <strong>Media:</strong> ${resultados.modeMediaMediana.media} <br>
    <strong>Moda:</strong> ${
      resultados.modeMediaMediana.moda !== null
        ? resultados.modeMediaMediana.moda
        : "Não possui"
    } <br> 
    <strong>Mediana:</strong> ${resultados.modeMediaMediana.mediana} <br> <br>
    <strong>Variância Amostral:</strong> ${
      resultados.variancias.varianciaA
    } <br>
    <strong>Variância Populacional:</strong> ${
      resultados.variancias.varianciaP
    } <br> <br>
    <strong>Desvio Padrão Populacional:</strong> ${
      resultados.desvios.desvioP
    } <br>
    <strong>Desvio Padrão Amostral:</strong> ${
      resultados.desvios.desvioA
    } <br> <br>
    <strong>Coeficiente Amostral:</strong> ${
      resultados.coeficiente.amostral
    } <br>
    <strong>Coeficiente Populacional:</strong> ${
      resultados.coeficiente.populacional
    } <br> <br>
    <strong>Amplitude:</strong> ${resultados.amplitude.amplitude}
  `;
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

    const modeMediaMediana = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados2 = await modeMediaMediana.json();

    const variancias = await fetch("http://localhost:3000/CalcularVariancias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados3 = await variancias.json();

    const desvios = await fetch("http://localhost:3000/CalcularDesvios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados4 = await desvios.json();

    const coeficiente = await fetch("http://localhost:3000/Coeficiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados5 = await coeficiente.json();

    const amplitude = await fetch("http://localhost:3000/Amplitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados6 = await amplitude.json();

    getByStateAndMonthGrafico(dados);

    const resultados = {
      modeMediaMediana: dados2,
      variancias: dados3,
      desvios: dados4,
      coeficiente: dados5,
      amplitude: dados6,
    };

    // Chame atualizarPainel1v2() com os resultados
    atualizarPainel1v2(resultados);

    return resultados;
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }

  document.getElementById("parametro").value = "";
}

async function atualizarPainel1v2(resultados) {
  // Agora resultados é passado como um argumento para a função

  const painel = document.getElementById("painel1");
  painel.innerHTML = `
    <strong>Media:</strong> ${resultados.modeMediaMediana.media} <br>
    <strong>Moda:</strong> ${
      resultados.modeMediaMediana.moda !== null
        ? resultados.modeMediaMediana.moda
        : "Não possui"
    } <br> 
    <strong>Mediana:</strong> ${resultados.modeMediaMediana.mediana} <br> <br>
    <strong>Variância Amostral:</strong> ${
      resultados.variancias.varianciaA
    } <br>
    <strong>Variância Populacional:</strong> ${
      resultados.variancias.varianciaP
    } <br> <br>
    <strong>Desvio Padrão Populacional:</strong> ${
      resultados.desvios.desvioP
    } <br>
    <strong>Desvio Padrão Amostral:</strong> ${
      resultados.desvios.desvioA
    } <br> <br>
    <strong>Coeficiente Amostral:</strong> ${
      resultados.coeficiente.amostral
    } <br>
    <strong>Coeficiente Populacional:</strong> ${
      resultados.coeficiente.populacional
    } <br> <br>
    <strong>Amplitude:</strong> ${resultados.amplitude.amplitude}
  `;
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

    const modeMediaMediana = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados2 = await modeMediaMediana.json();

    const variancias = await fetch("http://localhost:3000/CalcularVariancias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados3 = await variancias.json();

    const desvios = await fetch("http://localhost:3000/CalcularDesvios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados4 = await desvios.json();

    const coeficiente = await fetch("http://localhost:3000/Coeficiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados5 = await coeficiente.json();

    const amplitude = await fetch("http://localhost:3000/Amplitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados6 = await amplitude.json();

    getByCityAndMonthGrafico(dados);

    const resultados = {
      modeMediaMediana: dados2,
      variancias: dados3,
      desvios: dados4,
      coeficiente: dados5,
      amplitude: dados6,
    };

    atualizarPainel1(resultados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

async function atualizarPainel1(resultados) {
  // Agora resultados é passado como um argumento para a função

  const painel = document.getElementById("painel1");
  painel.innerHTML = `
    <strong>Media:</strong> ${resultados.modeMediaMediana.media} <br>
    <strong>Moda:</strong> ${
      resultados.modeMediaMediana.moda !== null
        ? resultados.modeMediaMediana.moda
        : "Não possui"
    } <br> 
    <strong>Mediana:</strong> ${resultados.modeMediaMediana.mediana} <br> <br>
    <strong>Variância Amostral:</strong> ${
      resultados.variancias.varianciaA
    } <br>
    <strong>Variância Populacional:</strong> ${
      resultados.variancias.varianciaP
    } <br> <br>
    <strong>Desvio Padrão Populacional:</strong> ${
      resultados.desvios.desvioP
    } <br>
    <strong>Desvio Padrão Amostral:</strong> ${
      resultados.desvios.desvioA
    } <br> <br>
    <strong>Coeficiente Amostral:</strong> ${
      resultados.coeficiente.amostral
    } <br>
    <strong>Coeficiente Populacional:</strong> ${
      resultados.coeficiente.populacional
    } <br> <br>
    <strong>Amplitude:</strong> ${resultados.amplitude.amplitude}
  `;
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
    const numeros = [];
    for (let par of pares) {
      const [rotulo, medida] = par.split(":");
      dados[rotulo.trim()] = Number(medida);
      numeros.push(Number(medida));
    }

    const modeMediaMediana = await fetch("http://localhost:3000/Estatisticas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados2 = await modeMediaMediana.json();

    const variancias = await fetch("http://localhost:3000/CalcularVariancias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados3 = await variancias.json();

    const desvios = await fetch("http://localhost:3000/CalcularDesvios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados4 = await desvios.json();

    const coeficiente = await fetch("http://localhost:3000/Coeficiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados5 = await coeficiente.json();

    const amplitude = await fetch("http://localhost:3000/Amplitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numeros),
    });

    const dados6 = await amplitude.json();

    getByReasonGrafico(dados);

    const resultados = {
      modeMediaMediana: dados2,
      variancias: dados3,
      desvios: dados4,
      coeficiente: dados5,
      amplitude: dados6,
    };

    atualizarPainel4(resultados);
  } catch (erro) {
    console.error("deu ruim man " + erro);
  }
}

async function atualizarPainel4(resultados) {
  // Agora resultados é passado como um argumento para a função

  const painel = document.getElementById("painel4");
  painel.innerHTML = `
    <strong>Media:</strong> ${resultados.modeMediaMediana.media} <br>
    <strong>Moda:</strong> ${
      resultados.modeMediaMediana.moda !== null
        ? resultados.modeMediaMediana.moda
        : "Não possui"
    } <br> 
    <strong>Mediana:</strong> ${resultados.modeMediaMediana.mediana} <br> <br>
    <strong>Variância Amostral:</strong> ${
      resultados.variancias.varianciaA
    } <br>
    <strong>Variância Populacional:</strong> ${
      resultados.variancias.varianciaP
    } <br> <br>
    <strong>Desvio Padrão Populacional:</strong> ${
      resultados.desvios.desvioP
    } <br>
    <strong>Desvio Padrão Amostral:</strong> ${
      resultados.desvios.desvioA
    } <br> <br>
    <strong>Coeficiente Amostral:</strong> ${
      resultados.coeficiente.amostral
    } <br>
    <strong>Coeficiente Populacional:</strong> ${
      resultados.coeficiente.populacional
    } <br> <br>
    <strong>Amplitude:</strong> ${resultados.amplitude.amplitude}
  `;
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
