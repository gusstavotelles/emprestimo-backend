'use strict';
module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define('Emprestimo', {
    cpf: DataTypes.STRING,
    uf: DataTypes.STRING,
    dtNascimento: DataTypes.DATE,
    valor: DataTypes.DECIMAL,
    valorTotal: DataTypes.DECIMAL,
    prazo: DataTypes.INTEGER,
    parcela: DataTypes.DECIMAL,
    concluido: DataTypes.BOOLEAN
  }, {});
  Emprestimo.associate = function(models) {
    // associations can be defined here
  };
  return Emprestimo;
};