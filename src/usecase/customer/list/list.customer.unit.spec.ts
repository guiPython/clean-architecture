import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import ListCustomerUseCase from "./list.customer"

const Repository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        create: jest.fn()
    }
}

describe("Unit Test list customers use case", () => {

    it("should list all users", async () => {
        const customer = CustomerFactory.createWithAddress(
            "Some...", new Address("Rua 7", 45, "4516", "São Paulo"));

        const other = CustomerFactory.createWithAddress(
            "Other...", new Address("Rua 9", 89, "2616", "São Paulo"));

        const repository = Repository();
        repository.findAll = jest.fn().mockReturnValue([customer, other])
        const result = await new ListCustomerUseCase(repository).execute({});
        expect(result.customers.length).toBe(2);
        expect(result.customers[0].id).toBe(customer.Id);
        expect(result.customers[0].name).toBe(customer.Name);
        expect(result.customers[0].address.city).toBe(customer.Address.City);
        expect(result.customers[0].address.zip).toBe(customer.Address.Zipcode);
        expect(result.customers[0].address.street).toBe(customer.Address.Street);
        expect(result.customers[0].address.number).toBe(customer.Address.Number);
    });

    it("should return empty list", async () => {
        const repository = Repository();
        repository.findAll = jest.fn().mockReturnValue([])
        const result = await new ListCustomerUseCase(repository).execute({});
        expect(result.customers.length).toBe(0);
        expect(result.customers).toEqual([]);
    });

});