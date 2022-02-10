const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../models/productsModel");
const salesModel = require("../../models/salesModel");

const productsService = require("../../services/productsService");
const salesService = require("../../services/salesService");

const product = { name: "produto", quantity: 10 };
const productResponse = {
  id: 1,
  name: "Martelo do Thor",
  quantity: 100,
};
const productsList = [
  {
    id: 1,
    name: "produto A",
    quantity: 10,
  },
  {
    id: 2,
    name: "produto B",
    quantity: 20,
  },
];
const saleToCreate = [
  {
    product_id: 1,
    quantity: 2,
  },
  {
    product_id: 2,
    quantity: 5,
  },
];
const TEST_ID = 1;

describe("Testes da camada Service", () => {
  describe("Na entidade products", () => {
    describe("O método 'create'", () => {
      before(async () => {
        const create = { id: TEST_ID };
        sinon.stub(productsModel, "getByName").resolves(false);
        sinon.stub(productsModel, "create").resolves(create);
      });
      after(async () => {
        productsModel.getByName.restore();
        productsModel.create.restore();
      });
      it("Deve cadastrar um novo produto e retornar um objeto", async () => {
        const response = await productsService.create(product);
        expect(response).to.be.an("object");
      });

      it("Deve retornar o produto cadastrado com seu id", async () => {
        const response = await productsService.create(product);
        expect(response).to.be.eql({ id: TEST_ID, ...product });
      });
    });
    describe("O método 'getAll'", () => {
      before(async () => {
        sinon.stub(productsModel, "getAll").resolves(productsList);
      });

      after(async () => {
        productsModel.getAll.restore();
      });
      it("Deve retornar um array de objetos", async () => {
        const response = await productsService.getAll();
        response.forEach((obj) => expect(obj).to.be.an("object"));
      });
      it("Deve retornar uma lista de produtos", async () => {
        const response = await productsService.getAll();
        expect(response).to.be.eql(productsList);
      });
    });
    describe("O método 'getById'", () => {
      before(async () => {
        sinon.stub(productsModel, "getById").resolves(productResponse);
      });
      after(async () => {
        productsModel.getById.restore();
      });

      it("Deve retornar um objeto", async () => {
        const response = await productsService.getById(TEST_ID);
        expect(response).to.be.an("object");
      });

      it("Deve retornar um produto com o id estipulado", async () => {
        const response = await productsService.getById(TEST_ID);
        expect(response.id).to.be.equal(TEST_ID);
      });
    });
  });
  describe("Na entidade sales", () => {
    describe("O método 'create'", () => {
      before(async () => {
        const create = { id: TEST_ID };
        sinon.stub(salesModel, "create").resolves(create);
        sinon.stub(productsModel, "updateProductsQty").resolves(null);
        sinon.stub(productsModel, "getById").resolves({quantity: 10});
      });
      after(async () => {
        salesModel.create.restore();
        productsModel.updateProductsQty.restore();
        productsModel.getById.restore();
      });
      it("Deve cadastrar uma nova venda e retornar um objeto", async () => {
        const response = await salesService.create(saleToCreate);
        expect(response).to.be.an("object");
      });

      it("Deve retornar a venda cadastrada com id e produtos", async () => {
        const response = await salesService.create(saleToCreate);
        expect(response).to.be.eql({ id: TEST_ID, itemsSold: saleToCreate });
      });
    });
    describe("O método 'getAll'", () => {
      const expected = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2,
        },
      ];
      const mockedGetAll = [
        {
          sale_id: 1,
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2,
        },
        {
          sale_id: 1,
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2,
        },
      ];
      before(async () => {
        sinon.stub(salesModel, "getAll").resolves(mockedGetAll);
      });

      after(async () => {
        salesModel.getAll.restore();
      });
      it("Deve retornar um array de objetos", async () => {
        const response = await salesService.getAll();
        response.forEach((obj) => expect(obj).to.be.an("object"));
      });
      it("Deve retornar uma lista de vendas", async () => {
        const response = await salesService.getAll();
        expect(response).to.be.eql(expected);
      });
    });
    describe("O método 'getById'", () => {
      const mockedGetById = [
        {
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 5,
        },
      ];
      before(async () => {
        sinon.stub(salesModel, "getById").resolves(mockedGetById);
      });
      after(async () => {
        salesModel.getById.restore();
      });

      it("Deve retornar um array de objetos", async () => {
        const response = await salesService.getById(TEST_ID);
        response.forEach((obj) => expect(obj).to.be.an("object"));
      });

      it("Deve retornar os produtos da venda estipulada", async () => {
        const response = await salesService.getById(TEST_ID);
        expect(response).to.be.eql(mockedGetById);
      });
    });
  });
});
