const frisby = require("frisby");
const mysql = require("mysql2/promise");
const Importer = require("mysql-import");
require("dotenv").config();

describe("Products", () => {
  const products = [
    { name: "Martelo de Thor", description: "toy", category:"toy", price:10 ,quantity: 10 },
    { name: "Traje de encolhimento", description: "costume", category: "costume", price:20, quantity: 20 },
    { name: "Escudo do Capitão América", description: "toy", category: "toy", price:30, quantity: 30 },
  ];
  const url = `http://localhost:${process.env.PORT}`;
  const INVALID_ID = 99999;
  let connection;

  beforeAll(async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    connection = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });

    const importer = new Importer({
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      host: MYSQL_HOST,
    });

    await importer.import("./StoreManager.sql");

    importer.disconnect();
  });

  beforeEach(async () => {
    const values = products.map(({ name, description, category, price, quantity }) => [name, description, category, price, quantity]);
    await connection.query(
      "INSERT INTO StoreManager.products (name, description, category, price, quantity) VALUES ?",
      [values]
    );
  });

  afterEach(async () => {
    await connection.execute("DELETE FROM StoreManager.products");
  });

  afterAll(async () => {
    await connection.execute("DROP DATABASE StoreManager");
    await connection.end();
  });

  function hasMessageField(body) {
    expect(Object.keys(body)).toContain("message");
  }
  
  describe("1 - Crie um endpoint para o cadastro de produtos", () => {
    it("Será validado que o campo name esteja presente no body da requisição", async()=>{
      await frisby
        .post(`${url}/products/`, {
          // name: "Olho de Thundera",
          description: "toy",
          category: "toy",
          price: 1,
          quantity: 2,
        })
        .expect("status", 400)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '\"name\" is required'
          );
        });
    })

    it("Será validade que o campo description esteja presente no body da requisicão", async() => {
      await frisby
        .post(`${url}/products/`, {
          name:"Olho de Thundera",
          // description: "toy",
          category: "toy",
          price: 1,
          quantity: 2
        })
        .expect("status", 400)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '\"description\" is required'
          );
        });
    })

    it("Será validado que o campo category esteja presente no body da requisição", async()=>{
      await frisby
        .post(`${url}/products/`, {
          name: "Olho de Thundera",
          description: "toy",
          // category: "toy",
          price: 1,
          quantity: 2,
        })
        .expect("status", 400)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '\"category\" is required'
          );
        });
    })

    it("Será validade que o campo price esteja presente no body da requisicão", async() => {
      await frisby
        .post(`${url}/products/`, {
          name:"Olho de Thundera",
          description: "toy",
          category: "toy",
          // price: 1,
          quantity: 2
        })
        .expect("status", 400)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '\"price\" is required'
          );
        });
    })

    it("Será validado que o campo quantity esteja presente no body da requisição", async()=> {
      await frisby
        .post(`${url}/products/`, {
          name: "Olho de Thundera",
          description: "toy",
          category: "toy",
          price: 1,
          // quantity: 2,
        })
        .expect("status", 400)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '\"quantity\" is required'
          );
        });
    })
    
    it("Será validado que não é possível criar um produto com o nome menor que 3 caracteres", async () => {
      await frisby
        .post(`${url}/products/`, {
          name: "It",
          description: "toy",
          category: "toy",
          price: 10,
          quantity: 100,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"name" length must be at least 3 characters long'
          );
        });
    });

    it("Será validado que não é possível criar um produto com o mesmo nome de outro já existente", async () => {
      await frisby
        .post(`${url}/products/`, {
          name: "Martelo de Thor",
          description: "toy",
          category: "toy",
          price: 10,
          quantity: 100,
        })
        .expect("status", 409)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual("Product already exists");
        });
    });

    it("Será validado que não é possível criar um produto com a descrição menor que 3 caracteres", async () => {
      await frisby
        .post(`${url}/products/`, {
          name: "Beyblade",
          description: "It",
          category: "toy",
          price: 10,
          quantity: 100,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"description" length must be at least 3 characters long'
          );
        });
    });

    it("Será validado que não é possível criar um produto com a categoria menor que 3 caracteres", async () => {
      await frisby
        .post(`${url}/products/`, {
          name: "Beyblade",
          description: "toy",
          category: "It",
          price: 10,
          quantity: 100,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"category" length must be at least 3 characters long'
          );
        });
    });

    it("Será validado que não é possível criar um produto com valor menor que zero", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Produto do Batista",
          description: "item",
          category: "general",
          price: -1,
          quantity: 1,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"price" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível criar um produto com valor igual a zero", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Produto do Batista",
          description: "item",
          category: "general",
          price: 0,
          quantity: 1,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"price" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível criar um produto com quantidade menor que zero", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Produto do Batista",
          description: "item",
          category: "general",
          price: 1,
          quantity: -1,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"quantity" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível criar um produto com quantidade igual a zero", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Produto do Batista",
          description: "item",
          category: "general",
          price: 1,
          quantity: 0,
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual(
            '"quantity" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível criar um produto com uma string no campo quantidade", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Produto do Batista",
          description: "item",
          category: "general",
          price: 1,
          quantity: "string",
        })
        .expect("status", 422)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          hasMessageField(body);
          const { message } = body;
          expect(message).toEqual('"quantity" must be a number larger than or equal to 1');
        });
    });

    it("Será validado que é possível criar um produto com sucesso", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Arco do Gavião Arqueiro",
          description: "toy",
          category: "general",
          price: 1,
          quantity: 1,
        })
        .expect("status", 201)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          const productName = body.name;
          const productDescription = body.description;
          const productCategory = body.category;
          const productPrice = body.price;
          const quantityProduct = body.quantity;
          expect(productName).toEqual("Arco do Gavião Arqueiro");
          expect(productDescription).toEqual("toy");
          expect(productCategory).toEqual("general");
          expect(productPrice).toEqual(1)
          expect(quantityProduct).toEqual(1);
          expect(body).toHaveProperty("id");
        });
    });
  });

  describe("2 - Crie um endpoint para listar os produtos", () => {
    it("Será validado que todos produtos estão sendo retornados", async () => {
      await frisby
        .get(`${url}/products`)
        .expect("status", 200)
        .then((res) => {
          let { body } = res;
          body = JSON.parse(body);
          const firstProductName = body[0].name;
          const firstProductDescription = body[0].description;
          const firstProductCategory = body[0].category;
          const firstProductPrice = body[0].price;
          const firstQuantityProduct = body[0].quantity;
          const secondProductName = body[1].name;
          const secondProductDescription = body[1].description;
          const secondProductCategory = body[1].category;
          const secondProductPrice = body[1].price;
          const secondQuantityProduct = body[1].quantity;
          const thirdProductName = body[2].name;
          const thirdProductDescription = body[2].description;
          const thirdProductCategory = body[2].category;
          const thirdProductPrice = body[2].price;
          const thirdQuantityProduct = body[2].quantity;

          expect(body[0]).toHaveProperty('id');
          expect(firstProductName).toEqual("Martelo de Thor");
          expect(firstProductDescription).toEqual("toy");
          expect(firstProductCategory).toEqual("toy");
          expect(firstProductPrice).toEqual("10.00");
          expect(firstQuantityProduct).toEqual(10);
          expect(body[1]).toHaveProperty('id');
          expect(secondProductName).toEqual("Traje de encolhimento");
          expect(secondProductDescription).toEqual("costume");
          expect(secondProductCategory).toEqual("costume")
          expect(secondProductPrice).toEqual("20.00");
          expect(secondQuantityProduct).toEqual(20);
          expect(body[2]).toHaveProperty('id');
          expect(thirdProductName).toEqual("Escudo do Capitão América");
          expect(thirdProductDescription).toEqual("toy");
          expect(thirdProductCategory).toEqual("toy");
          expect(thirdProductPrice).toEqual("30.00");
          expect(thirdQuantityProduct).toEqual(30);
        });
    });

    it("Será validado que não é possível listar um produto que não existe", async () => {
      await frisby
        .get(`${url}/products/${INVALID_ID}`)
        .expect("status", 404)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          const { message } = json;
          expect(message).toEqual("Product not found");
        });
    });

    it("Será validado que é possível listar um determinado produto", async () => {
      let result;

      await frisby
        .post(`${url}/products`, {
          name: "Armadura do Homem de Ferro",
          description: "costume",
          category: "costume",
          price: 10,
          quantity: 40,
        })
        .expect("status", 201)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          responseProductId = result.id;
        });

      await frisby
        .get(`${url}/products/${responseProductId}`)
        .expect("status", 200)
        .then((secondResponse) => {
          const { json } = secondResponse;
          const productName = json.name;
          const productDescription = json.description;
          const productCategory = json.category;
          const productPrice = json.price;
          const quantityProduct = json.quantity;
          expect(productName).toEqual("Armadura do Homem de Ferro");
          expect(productDescription).toEqual("costume");
          expect(productCategory).toEqual("costume");
          expect(productPrice).toEqual("10.00");
          expect(json).toHaveProperty("id");
          expect(quantityProduct).toEqual(40);
        });
    });
  });

  describe("3 - Crie um endpoint para atualizar um produto", () => {
    it("Será validado que não é possível atualizar um produto com o nome menor que 3 caracteres", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "It",
          description: "item",
          category: "general",
          price: 10,
          quantity: 10,
        })
        .expect("status", 422)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          expect(json.message).toEqual(
            '"name" length must be at least 3 characters long'
          );
        });
    });

    it("Será validado que não é possível atualizar um produto o valor menor que zero", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "Martelo de Thor",
          description: "toy",
          category: "toy",
          price: -1,
          quantity: 1,
        })
        .expect("status", 422)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          expect(json.message).toEqual(
            '\"price\" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível atualizar um produto com o valor igual a zero", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "Martelo de Thor",
          description: "toy",
          category: "toy",
          price: 0,
          quantity: 1,
        })
        .expect("status", 422)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          expect(json.message).toEqual(
            '\"price\" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível atualizar um produto com quantidade menor que zero", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "Martelo de Thor",
          description: "toy",
          category: "toy",
          price: 1,
          quantity: -1,
        })
        .expect("status", 422)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          expect(json.message).toEqual(
            '\"quantity\" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível atualizar um produto com quantidade igual a zero", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "Martelo de Thor",
          description: "toy",
          category: "toy",
          price: 1,
          quantity: 0,
        })
        .expect("status", 422)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          expect(json.message).toEqual(
            '\"quantity\" must be a number larger than or equal to 1'
          );
        });
    });

    it("Será validado que não é possível atualizar um produto com uma string no campo quantidade", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "Martelo de Thor",
          description: "toy",
          category: "toy",
          price: 1,
          quantity: "string",
        })
        .expect("status", 422)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          expect(json.message).toEqual('\"quantity\" must be a number larger than or equal to 1');
        });
    });

    it("Será validado que é possível atualizar um produto com sucesso", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .put(`${url}/products/${resultProductId}`, {
          name: "Machado de Thor",
          description: "toy",
          category: "toy",
          price: 20,
          quantity: 20,
        })
        .expect("status", 200)
        .then((secondResponse) => {
          const { json } = secondResponse;
          const productName = json.name;
          const productDescription = json.description;
          const productCategory = json.category;
          const productPrice = json.price;
          const quantityProduct = json.quantity;
          expect(productName).toEqual("Machado de Thor");
          expect(productDescription).toEqual("toy");
          expect(productCategory).toEqual("toy");
          expect(productPrice).toEqual(20);
          expect(quantityProduct).toEqual(20);
        });
    });

    it("Será validado que não é possível atualizar um produto que não existe", async () => {
      await frisby
        .put(`${url}/products/${INVALID_ID}`,{
          name: "produto inexistente",
          description: "item",
          category: "general",
          price: 1,
          quantity: 1,
        })
        .expect("status", 404)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json)
          const { message } = json;
          expect(message).toEqual("Product not found");
        });
    });
  });

  describe("4 - Crie um endpoint para deletar um produto", () => {
    it("Será validado que é possível deletar um produto com sucesso", async () => {
      let result;
      let resultProductId;

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          resultProductId = result[0].id;
        });

      await frisby
        .delete(`${url}/products/${resultProductId}`)
        .expect("status", 200)
        .then((secondResponse) => {
          let { body } = secondResponse;
          body = JSON.parse(body);
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("name");
          expect(body).toHaveProperty("description");
          expect(body).toHaveProperty("category");
          expect(body).toHaveProperty("price");
          expect(body).toHaveProperty("quantity");
        });

      await frisby
        .get(`${url}/products/`)
        .expect("status", 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          expect(result.length).toBe(2);
        });
    });

    it("Será validado que não é possível deletar um produto que não existe", async () => {
      await frisby
        .delete(`${url}/products/${INVALID_ID}`)
        .expect("status", 404)
        .then((secondResponse) => {
          const { json } = secondResponse;
          hasMessageField(json);
          expect(json.message).toEqual("Product not found");
        });
    });
  });
});
