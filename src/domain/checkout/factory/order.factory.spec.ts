import { v4 as uuid } from "uuid"
import OrderFactory from "./order.factory";

describe("Order factory tests", () => {
    it("should create a order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [{
                id: uuid(),
                name: "Some...",
                productId: uuid(),
                quantity: 1,
                price: 100
            }]
        }

        const order = OrderFactory.create(orderProps);
        expect(order.Id).toBe(orderProps.id);
        expect(order.CustomerId).toBe(orderProps.customerId);
        expect(order.Items.length).toBe(1);
    })
});