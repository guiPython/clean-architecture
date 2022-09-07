import Product from "../../product/entity/product";
import Order from "./order";
import OrderItem from "./order_item";



describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrowError("Customer id is required");
    });

    it("should throw error when order items is empty", () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrowError("Items qtd must be greater than 0");
    });

    it("should calculate total", () => {
        const item = new OrderItem("123", "1", "Some...", 150.00, 2);
        const order = new Order("1", "1", [item]);
        expect(order.total()).toBe(300.00);

        const otherItem  = new OrderItem("124", "2",  "Other...", 180.00, 1);
        const otherOrder = new Order("2", "1", [item, otherItem]);
        expect(otherOrder.total()).toBe(480.00);
    })

    it("should calculate when add new product total", () => {
        const item = new OrderItem("123", "1", "Some...", 150.00, 2);
        const order = new Order("1", "1", [item]);
        expect(order.total()).toBe(300.00);

        const productWithSameIdInOrder = new Product("1","Some...", 150);
        const productWithOtherId = new Product("2","Other...", 200);
        
        order.addProduct(productWithSameIdInOrder);
        expect(order.total()).toBe(450.00);

        order.addProduct(productWithOtherId);
        expect(order.total()).toBe(650.00);
    })
});