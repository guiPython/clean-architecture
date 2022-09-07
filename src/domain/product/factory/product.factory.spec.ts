import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
    it("should create a product type a", () => {
        const product = ProductFactory.create("a", "Some...", 120.00);
        expect(product.Id).toBeDefined();
        expect(product.Name).toBe("Some...");
        expect(product.Price).toBe(120.00);
        expect(product.constructor.name).toBe("Product")
    });

    it("should create a product type a", () => {
        const product = ProductFactory.create("b", "Other...", 120.00);
        expect(product.Id).toBeDefined();
        expect(product.Name).toBe("Other...");
        expect(product.Price).toBe(240.00);
        expect(product.constructor.name).toBe("OtherProduct")
    });
});