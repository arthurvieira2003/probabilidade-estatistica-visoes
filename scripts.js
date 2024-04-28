

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Março", 3],
    ["Abril", 1],
    ["Maio", 1],
    ["Junho", 1],
    ["Julho", 2],
  ]);

  var options = { title: "Teste Gráfico de Pizza", width: 400, height: 300 };

  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
