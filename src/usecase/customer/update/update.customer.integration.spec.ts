import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { UpdateCustomerUseCase } from "./update.customer";
import { InputUpdateCustomer, OutputUpdateCustomer } from "./update.customer.dto";

const customerMock = CustomerFactory.createWithAddress("Rafael",
                    new Address("Rua 7", 56, "85-8956", "São Paulo"))

const customerUpdatedMock = CustomerFactory.createWithAddress("André",
                    new Address("Rua 8", 64, "8545496-8956", "Rio de Janeiro"))

describe("Integration Test update customer use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a customer", async () => {
        const repository = new CustomerRepository();

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

        const repository = new CustomerRepository();
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
        const repository = new CustomerRepository();
        expect(async () => {await new UpdateCustomerUseCase(repository).execute(input)}).rejects.toThrow("Street is required");
    });
});