# Boas vindas ao repositório Store Manager-API

---

# Sumário

- [Habilidades](#habilidades)
  - [O que foi desenvolvido](#o-que-foi-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
- [Como desenvolver](#como-desenvolver)
  - [Conexão com o Banco](#conexão-com-o-banco)
  - [Tabelas](#tabelas)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Linter](#linter)
  - [Lista de requisitos](#lista-de-requisitos)

    `Requisitos Primários`
    - [1 - Criar um endpoint para o cadastro de produtos](#1---criar-um-endpoint-para-o-cadastro-de-produtos)
    - [2 - Criar um endpoint para listar os produtos](#2---criar-um-endpoint-para-listar-os-produtos)
    - [3 - Criar um endpoint para atualizar um produto](#3---criar-um-endpoint-para-atualizar-um-produto)
    - [4 - Criar um endpoint para deletar um produto](#4---criar-um-endpoint-para-deletar-um-produto)
    - [5 - Criar um endpoint para cadastrar vendas](#5---criar-um-endpoint-para-cadastrar-vendas)
    - [6 - Criar um endpoint para listar as vendas](#6---criar-um-endpoint-para-listar-as-vendas)
    - [7 - Criar um endpoint para atualizar uma venda](#7---criar-um-endpoint-para-atualizar-uma-venda)
    - [8 - Escrever testes para cobrir 35% das camadas da sua aplicação](#8---escrever-testes-para-cobrir-35-das-camadas-da-aplicação)
    - [9 - Escrever testes para cobrir 40% das camadas da sua aplicação](#9---escrever-testes-para-cobrir-40-das-camadas-da-aplicação)

    `Requisitos Secundários`

    - [10 - Criar um endpoint para deletar uma venda](#10---criar-um-endpoint-para-deletar-uma-venda)
    - [11 - Atualizar a quantidade de produtos](#11---atualizar-a-quantidade-de-produtos)
    - [12 - Validar a quantidade de produtos](#12---validar-a-quantidade-de-produtos)
    - [13 - Escrever testes para cobrir 50% das camadas da sua aplicação](#13---escrever-testes-para-cobrir-50-das-camadas-da-aplicação)
    - [14 - Escrever testes para cobrir 60% das camadas da sua aplicação](#14---escrever-testes-para-cobrir-60-das-camadas-da-aplicação)

---

# Habilidades

Nesse projeto, eu fui capaz de:

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

---

## O que foi desenvolvido

Uma API utilizando a arquitetura MSC!

A API construída trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.

---

## Desenvolvimento

Foram todas as camadas MSC da API (Models, Services caso necessário, e Controllers).

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais mais íntimas 😜).

Foi utilizado o banco MySQL para a gestão de dados. Além disso, a API é RESTful.

⚠️ **Dicas Importantes** ⚠️:

- Deve ser possível que a pessoa usuária, independente de cadastro ou login, possa adicionar, ler, deletar e atualizar produtos no seu estoque. A pessoa usuária deve poder também enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe. Deve-se também, ser possível ler, deletar e atualizar vendas.

- Para **todos os endpoints** garanta que:

  - Caso o recurso **não seja encontrado**, **aconteça um erro erro**, ou **haja dados inválidos** na requisição, a API retorna o status HTTP adequado com o body `{ message: <mensagem de erro> }`.
  - Todos os retornos de erro seguiram o mesmo formato.

- Foram utilizados middlewares e objetos de erro personalizados para que não tenha que repetir a lógica de tratamento de erro em vários lugares. Lembrando também do [express-rescue](https://www.npmjs.com/package/express-rescue), ele facilitou muito o trabalho de tratar erros.

- Em caso de dúvida sobre qual status HTTP utilizar, foram consultados sites como o [httpstatuses.com](https://httpstatuses.com/), [restapitutorial.com](https://www.restapitutorial.com/httpstatuscodes.html) e a [documentação sobre o assunto no MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status).

- Para realizar a validação dos dados, foram utilizados pacotes como [`Joi`](https://www.npmjs.com/package/@hapi/joi) e o [`Expresso Validator`](https://www.npmjs.com/package/@expresso/validator).

---

# Como desenvolver

### Todos os seus endpoints devem estar no padrão REST

- Usando os verbos HTTP adequados para cada operação.

- Agrupando e padronizando as URL em cada recurso.

- Garantindo que os endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Retornando os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

### Cada camada da API deve estar em sua respectiva pasta

- Models está na pasta `models`, **na raiz do projeto**

- Services está na pasta `services`, **na raiz do projeto**

- Controllers está na pasta `controllers`, **na raiz do projeto**

### Para escrever os arquivos de teste

- Utilizei o **mocha**, **chai** e **sinon** para escrever os testes

- Coloquei todos os testes de `models` no arquivo `test/unit/models.js`

- Coloquei todos os testes de `services` no arquivo `test/unit/services.js`

- Coloquei todos os testes de `controllers` no arquivo `test/unit/controllers.js`


### Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

```javascript
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
```
Para os testes rodarem corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

**Nota**: A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente na máquina local.

Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
Como o arquivo `.env` não será enviado para o GitHub (não se preocupe com isso, pois já está configurado no `.gitignore`), o avaliador utilizará as suas próprias variáveis de ambiente.

### Tabelas

Na raiz do projeto existe o arquivo `StoreManager.sql` que será usado para rodar os testes. Você pode importá-lo localmente para testar o comportamento da sua aplicação durante o desenvolvimento.

O banco terá três tabelas: `products`, `sales` e `sales_products`.

A tabela `products` tem o seguinte formato:

![Tabela Produtos](./public/tableproducts.png)

(O id será gerado automaticamente)

A tabela `sales` tem o seguinte formato:

![Tabela Vendas](./public/tablesales.png)

(O id e date são gerados automaticamente)

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato:

![Tabela Vendas-Produtos](./public/tablesalesproducts.png)


# Requisitos do projeto

## Linter

Foi utilizado o [ESLint](https://eslint.org/) para fazer a análise estática do código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas no arquivos `package.json`.

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no código, tais problemas serão mostrados no seu terminal. Se não houver problema no código, nada será impresso no seu terminal.

Você pode também instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

---

## Testes

Foi utilizado o [Jest]() e o [Frisby] para fazer os testes de api.

Na seção [Conexão com o Banco](#conexão-com-o-banco), está especificado como a conexão deve ser feita, para que os testes rodem.

Este projeto já vem configurado e com suas dependências.

Para poder executar os testes basta executar comando `npm tests` e o resultado será igual o abaixo:

![Testes](./public/testejestfrisby.png)

**Atenção:** Após rodar os testes, seu banco de dados local será dropado, lembre-se de importá-lo novamente.

## Dica: desativando testes

Você pode desabilitar temporariamente um teste utilizando a função `skip` junto à função `it`. Como o nome indica, esta função "pula" um teste:

```js
it.skip('it includes the text `Movie Cards Library` inside a h1 tag', () => {
  wrapper = shallow(<Header />);

  expect(wrapper.find('header h1').text()).toBe('Movie Cards Library');
});
```

Na saída da execução dos testes, você verá um <img src="./public/orange-circle.png" width="15px"> indicando que o teste está sendo pulado:

![image](./public/skipped-test.png)


## Lista de requisitos

### 1 - Criar um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos na tabela `products` do Banco de Dados;

- O endpoint deve receber a seguinte estrutura:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

<details close>
  <summary>O que será validado</summary>
  <br>
  
  > :point_right: Para o endpoint `POST /products`, o campo `name` deve ser uma _string_ com 5 ou mais caracteres e deve ser único.
  - Quando a requisição é feita sem o atributo `name` :  
    ```json
      { "quantity": 100 }
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"name\" is required" }          
    ```

  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      { "name": "pro", "quantity": 100 }
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"name\" length must be at least 5 characters long" }          
    ```
  - Quando a requisição é feita com o atributo `name` igual um já cadastrado:
    ```json
      { "name": "produto", "quantity": 100 }
    ```
    - sua API deve responder com status http `409` e o seguinte `body`:
    ```json
      { "message": "Product already exists" }          
    ```

  > :point_right: Para o endpoint `POST /products`, o campo`quantity` deve ser um número inteiro maior que 0.
  - Quando a requisição é feita sem o atributo `quantity` :
    ```json
      { "name": "produto" }
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
      ```json
        { "message": "\"quantity\" is required" }          
      ```

  - Quando a requisição é feita e contém os seguintes `body`:
    ```json
      { "name": "produto", "quantity": "string" }
    ```         
    ```json
      { "name": "produto", "quantity": -1 }
    ```
    ```json
      { "name": "produto", "quantity": 0 }
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"quantity\" must be a number larger than or equal to 1" }           
    ```

  > :point_right: Para o endpoint `POST /products`, quando a requisição é feita corretamente, o produto deve ser cadastrado.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      { "name": "produto", "quantity": 10 }
    ```
    - sua API deve responder com status http `201` e o seguinte `body`:
    ```json
      { "id": 1, "name": "produto", "quantity": 10 }          
    ```
</details>

---

### 2 - Criar um endpoint para listar os produtos

- O endpoint deve ser acessível através do caminho (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos devem ser retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL deve ser retornado;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `GET /products`, será validado que todos produtos estão sendo retornados.
  - sua API deve responder com status http `200` e o seguinte `body`:
  ```json
    [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]
  ```

  > :point_right: Para o endpoint `GET /products/:id`, será validado que é possível listar um determinado produto.
  - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ```
  
  > :point_right: Para o endpoint `GET /products/:id`, será validado que não é possível listar um produto que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

---

### 3 - Criar um endpoint para atualizar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL deve ser atualizado;

- O corpo da requisição deve receber a seguinte estrutura:

```json
{
  "name": "new_product_name",
  "quantity": "new_product_quantity"
}
```

<details close>
  <summary>O que será validado</summary>
  <br>
  
  > :point_right: Para o endpoint `PUT /products/:id`, o campo `name` deve ser uma _string_ com 5 ou mais caracteres e deve ser único.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      { "name": "pro", "quantity": 15 }
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"name\" length must be at least 5 characters long" }          
    ```

  > :point_right: Para o endpoint `PUT /products/:id`, o campo`quantity` deve ser um número inteiro maior que 0.
  - Quando a requisição é feita e contém os seguintes `body`:
    ```json
      { "name": "produto", "quantity": "string" }
    ```         
    ```json
      { "name": "produto", "quantity": -1 }
    ```
    ```json
      { "name": "produto", "quantity": 0 }
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"quantity\" must be a number larger than or equal to 1" }           
    ```

  > :point_right: Para o endpoint `PUT /products/:id`, quando a requisição é feita corretamente, o produto deve ser alterado.
  - Quando a requisição é feita e contém o seguinte `body`: 
    ```json
      { "name": "produto", "quantity": 15 }
    ```
    - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      { "id": 1, "name": "produto", "quantity": 15 }          
    ```
  
  > :point_right: Para o endpoint `PUT /products/:id`, será validado que não é possível alterar um produto que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

---

### 4 - Criar um endpoint para deletar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL deve ser deletado;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `DELETE /products/:id`, será validado que é possível deletar um produto com sucesso.
  - sua API deve responder com status http `200` e o seguinte `body`:
  ```json
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }
  ```

  > :point_right: Para o endpoint `DELETE /products/:id`, será validado que não é possível deletar um produto que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

---

### 5 - Criar um endpoint para cadastrar vendas

- O endpoint deve ser acessível através do caminho (`/sales`);

- As vendas enviadas devem ser salvas na tabela `sales` e `sales_products` do Banco de dados;

- Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;

- O endpoint deve receber a seguinte estrutura:

```json
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

<details close>
  <summary>O que será validado</summary>
  <br>
  
  > :point_right: Para o endpoint `POST /sales`, o campo `product_id` deve ser um _id_ de um produto anteriormente cadastrado.
  - Quando a requisição é feita sem o atributo `product_id` :  
    ```json
      [
        {
          "quantity": 1
        }
      ]
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"product_id\" is required" }          
    ```

  > :point_right: Para o endpoint `POST /sales`, o campo`quantity` deve ser um número inteiro maior que 0.
  - Quando a requisição é feita sem o atributo `quantity` :
    ```json
      [
        {
          "product_id": 1
        }
      ]
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
      ```json
        { "message": "\"quantity\" is required" }          
      ```

  - Quando a requisição é feita e contém os seguintes `body`:
    ```json
      [
        {
          "product_id": 1,
          "quantity": -1
        }
      ]
    ```         
    ```json
      [
        {
          "product_id": 1,
          "quantity": 0
        }
      ]
    ```
    ```json
      [
        {
          "product_id": 1,
          "quantity": "string"
        }
      ]
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"quantity\" must be a number larger than or equal to 1" }           
    ```

  > :point_right: Para o endpoint `POST /sales`, quando a requisição é feita corretamente, o produto deve ser cadastrado.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      [
        {
          "product_id": 1,
          "quantity": 3
        }
      ]
    ```
    - sua API deve responder com status http `201` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "itemsSold": [
          {
            "product_id": 1,
            "quantity": 3
          }
        ]
      }          
    ```

  > :point_right: Para o endpoint `POST /sales`, quando a requisição é feita corretamente, a venda deve ser cadastrada.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      [
        {
          "product_id": 1,
          "quantity": 2
        },
        {
          "product_id": 2,
          "quantity": 5
        }
      ]
    ```
    - sua API deve responder com status http `201` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "itemsSold": [
          {
            "product_id": 1,
            "quantity": 2
          },
          {
            "product_id": 2,
            "quantity": 5
          }
        ]
      }          
    ```
</details>

---

### 6 - Criar um endpoint para listar as vendas

- O endpoint deve ser acessível através do caminho (`/sales`) ou (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas devem ser retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL deve ser retornada;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `GET /sales`, será validado que todas vendas estão sendo retornados.
  - sua API deve responder com status http `200` e o seguinte `body`:
  ```json
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ]
  ```

  > :point_right: Para o endpoint `GET /sales/:id`, será validado que é possível listar uma determinada venda.
  - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      [
        { 
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "product_id": 2,
          "quantity": 2
        }
      ]
    ```
  
  > :point_right: Para o endpoint `GET /sales/:id`, será validado que não é possível listar uma venda que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Sale not found" }
    ```
</details>

---

### 7 - Criar um endpoint para atualizar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- `quantity` deve ser um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL deve ser atualizada;

- O corpo da requisição deve receber a seguinte estrutura:

```json
[
  {
    "product_id": "id_change",
    "quantity": "new_quantity"
  }
]
```

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `PUT /sales/:id`, o campo `product_id` deve ser um _id_ de um produto anteriormente cadastrado.
  - Quando a requisição é feita sem o atributo `product_id` :  
    ```json
      [
        {
          "quantity": 10
        }
      ]
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"product_id\" is required" }          
    ```
  
  > :point_right: Para o endpoint `PUT /sales/:id`, o campo `quantity` deve ser um número inteiro maior que 0.
  - Quando a requisição é feita sem o atributo `quantity` :  
    ```json
      [
        {
          "product_id": 1
        }
      ]
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"quantity\" is required" }          
    ```

  - Quando a requisição é feita e contém os seguintes `body`:
    ```json
      [
        {
          "product_id": 1,
          "quantity": -1
        }
      ]
    ```         
    ```json
      [
        {
          "product_id": 1,
          "quantity": 0
        }
      ]
    ```
    ```json
      [
        {
          "product_id": 1,
          "quantity": "string"
        }
      ]
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"quantity\" must be a number larger than or equal to 1" }           
    ```

  > :point_right: Para o endpoint `PUT /sales/:id`, quando a requisição é feita corretamente, a venda deve ser alterada.
  - Quando a requisição é feita e contém o seguinte `body`: 
    ```json
      [
        {
          "product_id": 1,
          "quantity": 6
        }
      ]
    ```
    - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "saleId": 1,
        "itemUpdated": [
          {
            "product_id": 1,
            "quantity": 6
          }
        ]
      }        
    ```
</details>

---

### 8 - Escrever testes para cobrir 35% das camadas da aplicação

- Os arquivos de teste devem ficar no diretório `/test`;

- Os testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente pode parar o serviço do `MYSQL` em sua máquina. Para rodar os teste utilize `npm run test:mocha`;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Será validado que a cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 35%.

  > :point_right: Será validado que ao menos 24 linhas são cobertas pelos testes.
  
</details>

---

### 9 - Escrever testes para cobrir 40% das camadas da aplicação

- Os arquivos de teste devem ficar no diretório `test`;

- Os testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Será validado que a cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 40%.

  > :point_right: Será validado que ao menos 24 linhas são cobertas pelos testes.
  
</details>

---

## Requisitos Secundários

### 10 - Criar um endpoint para deletar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL deve ser deletado;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `DELETE /sales/:id`, será validado que é possível deletar uma venda com sucesso.
  - sua API deve responder com status http `200` e o seguinte `body`:
  ```json
    [
      { 
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ]   
  ```
  
  > :point_right: Para o endpoint `DELETE /sales/:id`, será validado que não é possível deletar uma venda que não existe. 
  - sua API deve responder com status http `404` e o seguinte `body`:
  ```json
    { "message": "Sale not found" }          
  ```

</details>

---

### 11 - Atualizar a quantidade de produtos

- Ao realizar uma venda, atualizá-la ou deletá-la, você deve também atualizar a quantidade do produto em questão presente na tabela responsável pelos produtos;

  - **Exemplo 1**: suponha que haja um produto chamado *Bola de Futebol* e a sua propriedade `quantity` tenha o valor *10*. Caso seja feita uma venda com *8* unidades desse produto, a quantidade do produto deve ser atualizada para *2* , pois 10 - 8 = 2;
  - **Exemplo 2**: Suponha que esta venda tenha sido deletada, logo estas *8* unidades devem voltar ao `quantity` e seu valor voltará a *10*, pois 2 + 8 = 10;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Será validado que ao **fazer uma determinada venda**, a quantidade do produto deverá ser atualizada **também** na tabela responsável pelos produtos.
  
  > :point_right: Será validado que ao **deletar uma determinada venda**, a quantidade do produto deverá ser atualizada **também** na tabela responsável pelos produtos;.
 
</details>

---

### 12 - Validar a quantidade de produtos

- Um produto nunca deve ter a quantidade em estoque menor que 0;

- Quando uma venda for realizada, garanta que a quantidade sendo vendida está disponível no estoque

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `POST /sales`, será validado que a quantidade de produtos em estoque nunca seja menor que 0 (zero). 
  - Quando a requisição é feita com uma quantidade superior a quantidade em estoque:  
    ```json
      [
        {
          "product_id": 1,
          "quantity": 100
        }
      ]
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "Such amount is not permitted to sell" }          
    ```
  
</details>

---

### 13 - Escrever testes para cobrir 50% das camadas da aplicação

- Os arquivos de teste devem ficar no diretório `test`;

- Os testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Será validado que a cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 50%.

  > :point_right: Será validado que ao menos 24 linhas são cobertas pelos testes.
  
</details>

---

### 14 - Escrever testes para cobrir 60% das camadas da aplicação

- Os arquivos de teste devem ficar no diretório `test`;

- Os testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Será validado que a cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 60%.

  > :point_right: Será validado que ao menos 24 linhas são cobertas pelos testes.
  
</details>

---
