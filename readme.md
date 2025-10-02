##📦PROJETO DE MONITORAMENTO DE PEDIDOS EM ESTOQUE 
Um sistema de gestão de estoque baseado em Programação Orientada a Objetos (POO), projetado para rastrear produtos, monitorar o fluxo de entradas/saídas e fornecer relatórios em tempo real.

💡 Sumário
Sobre o Projeto

Estrutura Orientada a Objetos (POO)

Funcionalidades e Menu Interativo

Tecnologias Utilizadas

Como Rodar o Projeto

Status do Projeto

🧐 ##Sobre o Projeto
## O Monitoramento de Pedidos em Estoque é uma ferramenta de linha de comando (CLI) desenvolvida para demonstrar e aplicar conceitos de Programação Orientada a Objetos (POO). O projeto utiliza TypeScript para garantir maior tipagem e robustez ao código, sendo compilado para JavaScript para execução em ambientes Node.js.

O sistema foca em:

Integridade de Dados: Garantir que todas as alterações de estoque sejam registradas por meio de objetos de Movimentação.

Tipagem Forte: Utilizar o TypeScript para evitar erros comuns de execução e melhorar a legibilidade do código.

Modularidade: Utilizar classes bem definidas (Produto, Estoque, Movimentação) para facilitar a manutenção e futuras expansões.

🏛️ Estrutura Orientada a Objetos (POO)
A arquitetura do projeto é baseada nas seguintes classes e relações:

Classe Principal	Responsabilidade	Atributos Chave
Produto	Representa um item no estoque.	nome, codigo, preco, quantidade (atributo privado)
Movimentacao	Classe Superclasse/Abstrata. Define a estrutura base para registrar alterações.	produto, quantidade_afetada, data
Entrada	Herda de Movimentacao. Registra a adição de produtos ao estoque.	Herda atributos da Movimentacao e registra alterações no Estoque.
Saida	Herda de Movimentacao. Registra a remoção de produtos do estoque (ex: venda/expedição).	Herda atributos da Movimentacao e registra alterações no Estoque.
Estoque	Gerencia todos os produtos e movimentações. Ponto central de controle.	Lista de objetos Produto, Lista de objetos Movimentacao.

Exportar para as Planilhas
✅ Funcionalidades e Menu Interativo
O sistema é operado através de um Menu Interativo que executa em loop até que o usuário escolha a opção "Sair".

Funcionalidades do Sistema:
Cadastrar Produto: Coleta Nome, Código, Preço e Quantidade Inicial.

Registrar Entrada de Produtos: Cria um objeto Entrada que atualiza o Produto no Estoque.

Registrar Saída de Produtos: Cria um objeto Saida que decrementa o Produto no Estoque.

Emissão de Alertas de Estoque Baixo: Exibe uma lista de produtos cuja quantidade está abaixo de um limite pré-definido.

Geração de Relatórios:

Estoque Atual: Lista todos os produtos com suas quantidades e preços.

Histórico de Movimentações: Lista todos os objetos Entrada e Saida com data e quantidade.

Calcular o Valor Total do Estoque: Calcula e exibe a soma de (Preço * Quantidade) de todos os produtos.

Sair do Sistema: Encerra o loop e finaliza o programa.

🛠️ Tecnologias Utilizadas
Este projeto foi construído utilizando as seguintes tecnologias:

Linguagem de Programação: TypeScript e JavaScript (execução via Node.js).

Ambiente de Desenvolvimento: Visual Studio Code (VS Code).

Gestor de Pacotes: NPM ou Yarn.

Compilador: tsc (TypeScript Compiler).

🚀 Como Rodar o Projeto
Siga os passos abaixo para testar o sistema em sua máquina local.

Pré-requisitos: Certifique-se de ter Node.js e npm (ou Yarn) instalados.

Clone o Repositório:

Bash

git clone [COLOQUE A URL DO SEU REPOSITÓRIO AQUI]
Acesse o Diretório do Projeto:

Bash

cd monitoramento-pedidos-estoque-poo
Instale as Dependências:

Isso incluirá o TypeScript e as bibliotecas necessárias.

Bash

npm install
Compile o Código TypeScript para JavaScript:

O compilador (tsc) irá gerar os arquivos .js na pasta de destino (geralmente dist ou build).

Bash

npm run build 
# ou, dependendo da sua configuração, pode ser: tsc
Execute o Programa:

Bash

node dist/main.js
# Ou, se houver um script de start no seu package.json:
npm start
O Menu Interativo será exibido, e você poderá começar a testar as funcionalidades de POO.

⭐ Status do Projeto
Status Atual: Concluído (Foco na Estrutura POO e Tipagem com TypeScript)

Próximos Passos: Implementar persistência de dados (salvar e carregar produtos em arquivo JSON ou CSV) para que os dados não se percam ao sair do sistema.

🤝 Contribuição

Contribuições são bem-vindas, especialmente para refatorar o código e aprimorar a aderência aos princípios SOLID e boas práticas de TypeScript.g
