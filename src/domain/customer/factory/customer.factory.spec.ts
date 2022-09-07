import Address from "../entity/address";
import CustomerFactory from "./customer.factory"

describe("Customer factory tests", () => {
    it("should create a new client without address", () => {
        const customer = CustomerFactory.create("Igor");

        expect(customer.Id).toBeDefined();
        expect(customer.Name).toBe("Igor");
        expect(customer.Address).toBeUndefined()
    })

    it("should create a new client with address", () => {
        const address = new Address("Rua 7", 58, "123-456", "São Paulo");
        const customer = CustomerFactory.createWithAddress("Igor", address);
        
        expect(customer.Id).toBeDefined();
        expect(customer.Name).toBe("Igor");
        expect(customer.Address).toBe(address);
    })
})