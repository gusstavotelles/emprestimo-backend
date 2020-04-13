'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Emprestimos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cpf: {
                type: Sequelize.STRING
            },
            uf: {
                type: Sequelize.STRING
            },
            dtNascimento: {
                type: Sequelize.DATE
            },
            valor: {
                type: Sequelize.DECIMAL
            },
            valorTotal: {
                type: Sequelize.DECIMAL
            },
            prazo: {
                type: Sequelize.INTEGER
            },
            parcela: {
                type: Sequelize.DECIMAL
            },
            concluido: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Emprestimos');
    }
};