
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("1", "Guilherme");
        const item = new OrderItem("1", "1", "Some...", 100, 2);
        const order = OrderService.placeOrder(customer, [item]);

        expect(customer.RewardPoints).toBe(100);
        expect(order.total()).toBe(200);
    });

    it("should get total of all orders", ()=> {
        const item = new OrderItem("1", "1", "Some...", 100, 2);
        const other = new OrderItem("2", "2", "Other...", 200, 4);

        const order = new Order("1", "1", [item]);
        const otherOrder = new Order("2", "1", [other]);

        const total = OrderService.total([order, otherOrder]);
        expect(total).toBe(1000);
    });
});