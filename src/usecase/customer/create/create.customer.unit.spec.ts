import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import { InputCreateCustomer, OutputCreateCustomer } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer";

const Repository = (): ICustomerRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test create customer use case", () => {
    it("should create a new customer", async () => {
        const repository = Repository();
        const usecase = new CreateCustomerUseCase(repository)
        const input: InputCreateCustomer = {
            name: "Guilherme",
            address: {
                street: "Rua 7", 
                number: 56, 
                zip: "85-8956", 
                city: "São Paulo"
            }
        }

        const output: OutputCreateCustomer = await usecase.execute(input)                                                                                                                                                                                                           
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zip: input.address.zip
            }
        });
    });

    it("should throw an error when name is missing", async () => {
        const repository = Repository();
        const usecase = new CreateCustomerUseCase(repository)
        const input: InputCreateCustomer = {
            name: "",
            address: {
                street: "Rua 7", 
                number: 56, 
                zip: "85-8956", 
                city: "São Paulo"
            }
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Name is required");                                                                                                                                                                                                          
    })

    it("should throw an error when street is missing", async () => {
        const repository = Repository();
        const usecase = new CreateCustomerUseCase(repository)
        const input: InputCreateCustomer = {
            name: "",
            address: {
                street: "", 
                number: 56, 
                zip: "85-8956", 
                city: "São Paulo"
            }
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Street is required");                                                                                                                                                                                                          
    })
});