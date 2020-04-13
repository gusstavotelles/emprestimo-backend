const { Emprestimo } = require('../models');

module.exports = {
    index(req, res) {
        Emprestimo.findAll({})
            .then(emprestimos => {
                res.json({
                    error: false,
                    data: emprestimos
                })
            })
            .catch(error => res.json({
                error: true,
                data: [],
                error: error
            }));
    },

    create(req, res) {
        let { cpf, uf, dtNascimento, valor, prazo } = req.body;
        valor = parseFloat(valor);
        prazo = parseFloat(prazo);

        const concluido = false;
        const hoje = new Date();
        dtNascimento = new Date(dtNascimento);
        let idade = Math.floor(Math.ceil(Math.abs(dtNascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);

        uf = uf.toUpperCase();
        switch (uf) {
            case "MG":
                valorTotal = valor + (valor * 1 * prazo) / 100;
                break;
            case "SP":
                valorTotal = valor + (valor * 0.8 * prazo) / 100;
                break;
            case "RJ":
                valorTotal = valor + (valor * 0.9 * prazo) / 100;
                break;
            case "ES":
                valorTotal = valor + (valor * 1.11 * prazo) / 100;
                break;
            default:
                break;
        }
        // valorTotal += this.calculaSeguro(idade, valorTotal, prazo);

        if (idade >= 18 && idade < 25) {
            valorTotal += (valorTotal * 0.1 * prazo) / 100;
        } else if (idade >= 25 && idade < 36) {
            valorTotal += (valorTotal * 0.15 * prazo) / 100;
        } else if (idade >= 36 && idade < 61) {
            valorTotal += (valorTotal * 0.3 * prazo) / 100;
        } else if (idade >= 61) {
            valorTotal += (valorTotal * 0.5 * prazo) / 100;
        }

        parcela = (valorTotal / prazo).toFixed(2);

        Emprestimo.create({
            cpf, uf, dtNascimento, valor, prazo, parcela, concluido, valorTotal
        }).then(emprestimo => {
            res.status(201).json({
                error: false,
                data: emprestimo,
                message: "Empréstimo Cadastrado"
            })
        }).catch(error =>
            res.json({
                error: true,
                data: [],
                error: error
            })
        );
    },

    calculaJuros(c, i, t) {
        return (c * i * t) / 100;
    },

    calculaSeguro(idade, valorTotal, prazo) {
        if (idade >= 18 && idade < 25) {
            return this.calculaJuros(valorTotal, 0.1, prazo);
        } else if (idade >= 25 && idade < 36) {
            return this.calculaJuros(valorTotal, 0.15, prazo);
        } else if (idade >= 36 && idade < 61) {
            return this.calculaJuros(valorTotal, 0.3, prazo);
        } else if (idade >= 61) {
            return this.calculaJuros(valorTotal, 0.5, prazo);
        }
    },

    update(req, res) {
        const idEmprestimo = req.params.id;
        concluido = true;

        Emprestimo.update({
            concluido
        }, {
            where: {
                id: idEmprestimo
            }
        })
            .then(emprestimo => res.status(201).json({
                error: false,
                data: emprestimo,
                message: "A solicitação foi realizada com sucesso"
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
    },

    destroy(req, res) {
        const idEmprestimo = req.params.id;

        Emprestimo.destroy({
            where: {
                id: idEmprestimo
            }
        })
            .then(status => res.status(201).json({
                error: false,
                message: 'emprestimo has been deleted'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
    }
}