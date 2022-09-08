import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import FindCustomerUseCase from "./find.customer";
import { InputFindCustomer, OutputFindCustomer } from "./find.customer.dto";

const customer = new Customer("111", "Rafael");
const address = new Address("Rua 7", 56, "85-8956", "São Paulo");
customer.changeAddress(address);

const Repository = (): ICustomerRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find customer use case", () => {
    it("should find a customer", async () => {
        const repository = Repository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(customer)),
        await repository.create(customer);

        const input: InputFindCustomer = {
            id: customer.Id
        }

        const output: OutputFindCustomer = {
            id: customer.Id,
            name: customer.Name,
            address: {
                street: customer.Address.Street,
                number: customer.Address.Number,
                city: customer.Address.City,
                zip: customer.Address.Zipcode
            }
        }

        const result = await new FindCustomerUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });

    it("should throw error when customer not found", async () => {
        const repository = Repository();
        repository.find = jest.fn().mockImplementation(() => {
            throw new Error("Customer not found");
        })
        await repository.create(customer);
        expect(() => {
            return new FindCustomerUseCase(repository).execute({id: "Some Id..."});
        }).rejects.toThrow("Customer not found")
    });
});