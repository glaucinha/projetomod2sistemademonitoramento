import * as readlineSync from "readline-sync";

class Produto {
  private quantidade: number;

  constructor(
    public nome: string,
    public codigo: string,
    public preco: number,
    quantidade: number,
    public estoqueMinimo: number // 🔹 novo atributo
  ) {
    if (!nome || !codigo || preco <= 0 || quantidade < 0 || estoqueMinimo < 0) {
      throw new Error("⚠️ Dados inválidos para cadastro do produto!");
    }
    this.quantidade = quantidade;
  }

  /** Retorna a quantidade atual do produto */
  getQuantidade(): number {
    return this.quantidade;
  }

  /** Atualiza a quantidade do produto (não pode ser negativa) */
  setQuantidade(valor: number): void {
    if (valor < 0) throw new Error("⚠️ Quantidade não pode ser negativa!");
    this.quantidade = valor;
  }
}

abstract class Movimentacao {
  constructor(
    public codigoProduto: string,
    public quantidade: number,
    public data: Date = new Date()
  ) {
    if (!codigoProduto || quantidade <= 0) {
      throw new Error("⚠️ Dados inválidos para movimentação!");
    }
  }

  /** Método abstrato que será implementado pelas subclasses */
  abstract aplicar(estoque: Estoque): void;
}

class Entrada extends Movimentacao {
  /** Aplica a entrada (aumenta a quantidade no estoque) */
  aplicar(estoque: Estoque): void {
    const produto = estoque.buscarProduto(this.codigoProduto);
    if (!produto) throw new Error("⚠️ Produto não encontrado!");
    produto.setQuantidade(produto.getQuantidade() + this.quantidade);
  }
}

class Saida extends Movimentacao {
  /** Aplica a saída (reduz a quantidade no estoque) */
  aplicar(estoque: Estoque): void {
    const produto = estoque.buscarProduto(this.codigoProduto);
    if (!produto) throw new Error("⚠️ Produto não encontrado!");
    if (produto.getQuantidade() < this.quantidade) {
      throw new Error("⚠️ Estoque insuficiente para saída!");
    }
    produto.setQuantidade(produto.getQuantidade() - this.quantidade);
  }
}

class Estoque {
  produtos: Produto[] = [];
  movimentacoes: Movimentacao[] = [];

  /** Cadastra um novo produto no estoque */
  cadastrarProduto(produto: Produto): void {
    if (this.buscarProduto(produto.codigo)) {
      throw new Error("⚠️ Já existe um produto com este código!");
    }
    this.produtos.push(produto);
  }

  /** Busca um produto pelo código */
  buscarProduto(codigo: string): Produto | undefined {
    return this.produtos.find(p => p.codigo === codigo);
  }

  /** Registra uma movimentação (entrada ou saída) */
  registrarMovimentacao(mov: Movimentacao): void {
    mov.aplicar(this);
    this.movimentacoes.push(mov);
    this.verificarEstoqueMinimo(); // 🔹 alerta automático após movimentação
  }

  /** Exibe um relatório do estoque atual */
  relatorioEstoque(): void {
    console.log("\n=== RELATÓRIO DE ESTOQUE ATUAL ===");
    if (this.produtos.length === 0) {
      console.log("⚠️ Nenhum produto cadastrado.");
      return;
    }
    this.produtos.forEach(p => {
      console.log(
        `Produto: ${p.nome} | Código: ${p.codigo} | Preço: R$${p.preco} | Quantidade: ${p.getQuantidade()} | Mínimo: ${p.estoqueMinimo}`
      );
      if (p.getQuantidade() < p.estoqueMinimo) {
        console.log("⚠️ ALERTA: Estoque abaixo do mínimo para este produto!");
      }
    });

    console.log(`\n💰 Valor total do estoque: R$${this.calcularValorTotal().toFixed(2)}`);
  }

  /** Exibe um relatório do histórico de movimentações */
  relatorioMovimentacoes(): void {
    console.log("\n=== HISTÓRICO DE MOVIMENTAÇÕES ===");
    if (this.movimentacoes.length === 0) {
      console.log("⚠️ Nenhuma movimentação registrada.");
      return;
    }
    this.movimentacoes.forEach(m => {
      console.log(
        `${m instanceof Entrada ? "Entrada" : "Saída"} | Produto: ${
          m.codigoProduto
        } | Quantidade: ${m.quantidade} | Data: ${m.data.toLocaleString()}`
      );
    });
  }

  /** Calcula o valor total do estoque (quantidade × preço de cada produto) */
  calcularValorTotal(): number {
    return this.produtos.reduce(
      (total, p) => total + p.getQuantidade() * p.preco,
      0
    );
  }

  /** Verifica produtos abaixo do estoque mínimo */
  verificarEstoqueMinimo(): void {
    const produtosCriticos = this.produtos.filter(
      p => p.getQuantidade() < p.estoqueMinimo
    );

    if (produtosCriticos.length > 0) {
      console.log("\n⚠️ ALERTA: Produtos abaixo do estoque mínimo!");
      produtosCriticos.forEach(p => {
        console.log(
          `- ${p.nome} (Código: ${p.codigo}) | Quantidade: ${p.getQuantidade()} | Mínimo: ${p.estoqueMinimo}`
        );
      });
    }
  }
}

/** Exibe o menu interativo e controla o sistema */
function menu() {
  const estoque = new Estoque();
  let opcao = "";

  while (opcao !== "7") {
    console.log("\n===== SISTEMA DE MONITORAMENTO DE PEDIDOS DE ESTOQUE =====");
    console.log("1 - Cadastrar Produto");
    console.log("2 - Registrar Entrada de Produto");
    console.log("3 - Registrar Saída de Produto");
    console.log("4 - Gerar Relatórios de Estoque");
    console.log("5 - Gerar Histórico de Movimentações");
    console.log("6 - Calcular Valor Total do Estoque");
    console.log("7 - Sair do Sistema");

    opcao = readlineSync.question("Escolha uma opcao: ");

    try {
      switch (opcao) {
        case "1":
          const nome = readlineSync.question("Nome do produto: ");
          const codigo = readlineSync.question("Codigo do produto: ");
          const preco = parseFloat(readlineSync.question("Preco do produto: "));
          const qtd = parseInt(readlineSync.question("Quantidade inicial: "));
          const minimo = parseInt(readlineSync.question("Estoque mínimo: "));
          estoque.cadastrarProduto(new Produto(nome, codigo, preco, qtd, minimo));
          console.log("✅ Produto cadastrado com sucesso!");
          break;

        case "2":
          const codEntrada = readlineSync.question("Codigo do produto: ");
          const qtdEntrada = parseInt(readlineSync.question("Quantidade de entrada: "));
          estoque.registrarMovimentacao(new Entrada(codEntrada, qtdEntrada));
          console.log("✅ Entrada registrada com sucesso!");
          break;

        case "3":
          const codSaida = readlineSync.question("Codigo do produto: ");
          const qtdSaida = parseInt(readlineSync.question("Quantidade de saída: "));
          estoque.registrarMovimentacao(new Saida(codSaida, qtdSaida));
          console.log("✅ Saída registrada com sucesso!");
          break;

        case "4":
          estoque.relatorioEstoque();
          break;

        case "5":
          estoque.relatorioMovimentacoes();
          break;

        case "6":
          console.log(
            `\n💰 Valor total do estoque: R$${estoque.calcularValorTotal().toFixed(2)}`
          );
          break;

        case "7":
          console.log("👋 Saindo do sistema...");
          break;

        default:
          console.log("❌ Opcao invalida!");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

menu()
