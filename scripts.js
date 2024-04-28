const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:jEPoQSVJdeCUalyeQupAfcIbysMIaQXA@monorail.proxy.rlwy.net:32176/ProbEstatisticaDb')

const AppTechnicalVisits = sequelize.define('AppTechnicalVisits', {
    // defina aqui os campos do seu modelo, se necessário
  }, {
    freezeTableName: true,
    timestamps: false
  });

  sequelize.query('SELECT EXTRACT(MONTH FROM "DataDoServico") as month, COUNT(*) as count FROM "AppTechnicalVisits" GROUP BY month', 
  { type: Sequelize.QueryTypes.SELECT }
).then(function(results) {
  // results será um array de objetos com os campos month e count
  console.log(results);
}).catch(function(error) {
  console.error(error);
});
  
