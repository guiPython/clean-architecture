import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        const product = new Product("1", "Some...", 58.56);
        const other = new Product("2", "Other...", 20.00);
        const products = [product, other];

        ProductService.increasePrice(products, 100);
        expect(product.Price).toBe(117.12);
        expect(other.Price).toBe(40.00);
    });
});