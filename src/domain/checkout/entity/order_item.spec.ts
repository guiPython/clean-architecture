import Product from "../../product/entity/product";
import OrderItem from "./order_item";



describe("Order item unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new OrderItem("", "123", "name", 25.56, 2);
        }).toThrowError("Id is required");
    });

    it("should throw error when product id is empty", () => {
        expect(() => {
            new OrderItem("123", "", "name", 89.58, 1);
        }).toThrowError("Product id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new OrderItem("123", "1", "", 52.89, 1);
        }).toThrowError("Name is required");
    });

    it("should throw error when order item quantity is less than 0", () => {
        expect(() => {
            new OrderItem("123", "2", "name", 58, -1);
        }).toThrowError("Quantity must be greater than 0");
    });

    it("should throw error when order item quantity is 0", () => {
        expect(() => {
            new OrderItem("123", "3", "name", 78.58, 0);
        }).toThrowError("Quantity must be greater than 0");
    });

    it("should throw error when order item price is 0", () => {
        expect(() => {
            new OrderItem("123", "3", "name", -1, 2);
        }).toThrowError("Price must be greater than 0");
    });

    it("should throw error when order item price is 0", () => {
        expect(() => {
            new OrderItem("123", "3", "name", 0, 1);
        }).toThrowError("Price must be greater than 0");
    });

    it("should increase quantity", () => {
        const item = new OrderItem("123", "1", "Some...", 150.00, 2);
        const product = new Product("1", "Some...", 100);
        expect(item.Quantity).toBe(2);

        item.increaseQuantity(product);
        expect(item.Quantity).toBe(3);
    })

    it("should not increase quantity", () => {
        const item = new OrderItem("123", "1", "Some...", 150.00, 2);
        const product = new Product("2", "Some...", 100);
        expect(item.Quantity).toBe(2);

        item.increaseQuantity(product);
        expect(item.Quantity).toBe(2);
    })

    it("should calculate total", () => {
        const item = new OrderItem("123", "1", "Some...", 150.00, 2);
        expect(item.total()).toBe(300.00);

        const otherItem  = new OrderItem("124", "2",  "Other...", 180.00, 1);
        expect(otherItem.total()).toBe(180.00);
    })
});