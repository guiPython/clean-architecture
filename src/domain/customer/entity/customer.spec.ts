import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer("", "Guilherme");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        let customer = new Customer("123", "Marcos");
        customer.changeName("José");
        expect(customer.Name).toBe("José");
    })

    it("should activate customer", () => {
        let customer = new Customer("123", "Marcos");
        const address = new Address("Rua 7", 48, "123-485", "São Paulo");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive()).toBeTruthy();
    })

    it("should throw error when address is undefined when you activate a customer", () => {
        let customer = new Customer("123", "Marcos");  
        expect(() => {
            customer.activate();
        }).toThrowError("Address is mandatory to active a customer");
    })

    it("should deactivate customer", () => {
        let customer = new Customer("123", "Marcos");
        customer.deactivate();
        expect(customer.isActive()).toBeFalsy();
    })

    it("should add reward points", () => {
        let customer = new Customer("123", "Marcos");
        expect(customer.RewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.RewardPoints).toBe(10);
        customer.addRewardPoints(40);
        expect(customer.RewardPoints).toBe(50);
    })

    it("should throw error when add negative reward points", () => {
        let customer = new Customer("123", "Marcos");
        expect(() => customer.addRewardPoints(0)).toThrowError("Cannot add negative reward points");
        expect(() => customer.addRewardPoints(-1)).toThrowError("Cannot add negative reward points");
    })
});