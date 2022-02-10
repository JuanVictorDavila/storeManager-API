const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../models/connection");

const productsService = require("../../services/productsService");
const salesService = require("../../services/salesService");

const productsController = require("../../controllers/productsController");
const salesController = require("../../controllers/salesController");

const TEST_ID = 1;
const mockedProduct = { id: 1, name: "produto", quantity: 10 };
const mockedProductsList = [
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

const mockedSale = {
  id: 1,
  itemsSold: [
    {
      product_id: 1,
      quantity: 3,
    },
  ],
};

const mockedSalesList = [
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

const mockedSaleProducts = [
  {
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2,
  },
];

describe("Testes da camada Controller", () => {
  describe("Na entidade products", () => {
    describe("O método 'create'", () => {
      const req = {};
      const res = {};
      before(() => {
        req.body = { name: "produto", quantity: 10 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, "create").resolves(mockedProduct);
      });
      after(() => {
        productsService.create.restore();
      });

      it("Deve retornar status 201 quando um produto for criado com sucesso", async () => {
        await productsController.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it("Deve chamar json com o produto criado", async () => {
        await productsController.create(req, res);
        expect(res.json.calledWith(mockedProduct)).to.be.equal(true);
      });
    });
    describe("O método 'getAll'", () => {
      const req = {};
      const res = {};
      before(() => {
        req.body = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, "getAll").resolves(mockedProductsList);
      });
      after(() => {
        productsService.getAll.restore();
      });
      it("Deve retornar status 200 quando a lista de produtos for retornada com sucesso", async () => {
        await productsController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it("Deve chamar json com a lista de produtos", async () => {
        await productsController.getAll(req, res);
        expect(res.json.calledWith(mockedProductsList)).to.be.equal(true);
      });
    });
    describe("O método 'getById'", () => {
      const req = {};
      const res = {};
      before(() => {
        req.params = { id: TEST_ID };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, "getById").resolves(mockedProduct);
      });
      after(() => {
        productsService.getById.restore();
      });
      it("Deve retornar status 200 quando o produto for retornado com sucesso", async () => {
        await productsController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it("Deve chamar json com o produto requisitado", async () => {
        await productsController.getById(req, res);
        expect(res.json.calledWith(mockedProduct)).to.be.equal(true);
      });
    });
  });
  describe("Na entidade sales", () => {
    describe("O método 'create'", () => {
      const req = {};
      const res = {};
      before(() => {
        req.body = [{ product_id: 1, quantity: 3 }];

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, "create").resolves(mockedSale);
      });
      after(() => {
        salesService.create.restore();
      });

      it("Deve retornar status 201 quando uma venda for criada com sucesso", async () => {
        await salesController.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it("Deve chamar json com a venda criada", async () => {
        await salesController.create(req, res);
        expect(res.json.calledWith(mockedSale)).to.be.equal(true);
      });
    });
    describe("O método 'getAll'", () => {
      const req = {};
      const res = {};
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, "getAll").resolves(mockedSalesList);
      });
      after(() => {
        salesService.getAll.restore();
      });
      it("Deve retornar status 200 quando a lista de vendas for retornada com sucesso", async () => {
        await salesController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it("Deve chamar json com a lista de vendas", async () => {
        await salesController.getAll(req, res);
        expect(res.json.calledWith(mockedSalesList)).to.be.equal(true);
      });
    });
    describe("O método 'getById'", () => {
      const req = {};
      const res = {};
      before(() => {
        req.params = { id: TEST_ID };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, "getById").resolves(mockedSaleProducts);
      });
      after(() => {
        salesService.getById.restore();
      });
      it("Deve retornar status 200 quando a venda for retornada com sucesso", async () => {
        await salesController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it("Deve chamar json com o a venda requisitada", async () => {
        await salesController.getById(req, res);
        expect(res.json.calledWith(mockedSaleProducts)).to.be.equal(true);
      });
    });
  });
});
