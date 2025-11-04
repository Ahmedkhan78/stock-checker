const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  test("Viewing one stock", (done) => {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: "GOOG" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "stockData");
        assert.property(res.body.stockData, "stock");
        assert.property(res.body.stockData, "price");
        assert.property(res.body.stockData, "likes");
        assert.isString(res.body.stockData.stock);
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        done();
      });
  });

  test("Viewing one stock and liking it", (done) => {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: "GOOG", like: true })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isAtLeast(res.body.stockData.likes, 1);
        done();
      });
  });

  test("Viewing the same stock and liking it again", (done) => {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: "GOOG", like: true })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isAtLeast(res.body.stockData.likes, 1);
        done();
      });
  });

  test("Viewing two stocks", (done) => {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: ["GOOG", "MSFT"] })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        res.body.stockData.forEach((stock) => {
          assert.property(stock, "stock");
          assert.property(stock, "price");
          assert.property(stock, "rel_likes");
          assert.isString(stock.stock);
          assert.isNumber(stock.price);
          assert.isNumber(stock.rel_likes);
        });
        done();
      });
  });

  test("Viewing two stocks and liking them", (done) => {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: ["GOOG", "MSFT"], like: true })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        res.body.stockData.forEach((stock) => {
          assert.property(stock, "rel_likes");
          assert.isNumber(stock.rel_likes);
        });
        done();
      });
  });
});
