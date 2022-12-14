import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { UpdateCustomerUseCase } from "./update.customer"
import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import { InputUpdateCustomer, OutputUpdateCustomer } from "./update.customer.dto";

const customerMock = CustomerFactory.createWithAddress("Rafael",
                    new Address("Rua 7", 56, "85-8956", "São Paulo"))

const customerUpdatedMock = CustomerFactory.createWithAddress("André",
                    new Address("Rua 8", 64, "8545496-8956", "Rio de Janeiro"))


const Repository = (): ICustomerRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test update customer use case", () => {
    it("should update a customer", async () => {
        const repository = Repository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(customerMock))

        const input: InputUpdateCustomer = {
            id: customerMock.Id,
            name: customerUpdatedMock.Name,
            address: {
                street: customerUpdatedMock.Address.Street,
                city: customerUpdatedMock.Address.City,
                number: customerUpdatedMock.Address.Number,
                zip: customerUpdatedMock.Address.Zipcode
            }
        }

        const output: OutputUpdateCustomer = {
            id: customerMock.Id,
            name: customerUpdatedMock.Name,
            address: {
                street: customerUpdatedMock.Address.Street,
                number: customerUpdatedMock.Address.Number,
                city: customerUpdatedMock.Address.City,
                zip: customerUpdatedMock.Address.Zipcode
            }
        }

        const result = await new UpdateCustomerUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });

    it("should throw error when customer name is invalid", async () => {
        let input: InputUpdateCustomer = {
            id: customerMock.Id,
            name: "",
            address: {
                street: customerUpdatedMock.Address.Street,
                city: customerUpdatedMock.Address.City,
                number: customerUpdatedMock.Address.Number,
                zip: customerUpdatedMock.Address.Zipcode
            }
        }

        const repository = Repository();
        expect(async () => {await new UpdateCustomerUseCase(repository).execute(input)}).rejects.toThrow("Name is required");
    });

    it("should throw error when street address is invalid", async () => {
        let input: InputUpdateCustomer = {
            id: customerMock.Id,
            name: customerMock.Name,
            address: {
                street: "",
                city: customerUpdatedMock.Address.City,
                number: customerUpdatedMock.Address.Number,
                zip: customerUpdatedMock.Address.Zipcode
            }
        }
        const repository = Repository();
        expect(async () => {await new UpdateCustomerUseCase(repository).execute(input)}).rejects.toThrow("Street is required");
    });
});