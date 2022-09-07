import Product from "./product";


describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Name", 100);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than 0", () => {
        expect(() => {
            new Product("123", "Name", -1);
        }).toThrowError("Price must be greater than 0");
    });

    it("should throw error when price is 0", () => {
        expect(() => {
            new Product("123", "Name", 0);
        }).toThrowError("Price must be greater than 0");
    });

    it("should change name", () => {
        const product = new Product("123", "Some...", 156.00);
        const newName = "Other...";
        product.changeName(newName);
        expect(product.Name).toBe(newName);
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should change price", () => {
        const product = new Product("123", "Some...", 156.00);
        const newPrice = 300.25;
        product.changePrice(newPrice);
        expect(product.Price).toBe(newPrice);
    });

    it("should throw error when price is 0", () => {
        expect(() => {
            new Product("123", "Name", 0);
        }).toThrowError("Price must be greater than 0");
    });
});