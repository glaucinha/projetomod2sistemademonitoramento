"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
var Produto = /** @class */ (function () {
    function Produto(nome, codigo, preco, quantidade) {
        this.nome = nome;
        this.codigo = codigo;
        this.preco = preco;
        this.quantidade = quantidade;
    }
    // Método usado pelo seu código para obter o valor
    Produto.prototype.getQuantidade = function () {
        return this.quantidade;
    };
    // Método usado pelo seu código para atualizar o valor
    Produto.prototype.setQuantidade = function (novaQuantidade) {
        if (novaQuantidade >= 0) {
            this.quantidade = novaQuantidade;
        }
        else {
            console.error("Quantidade não pode ser negativa.");
        }
    };
    return Produto;
}());
exports.Produto = Produto;
