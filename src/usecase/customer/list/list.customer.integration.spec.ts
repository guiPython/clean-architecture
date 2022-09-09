import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import ListCustomerUseCase from "./list.customer";

describe("Unit Test list customers use case", () => {

    let sequelize: Sequelize; 
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should list all users", async () => {
        const customer = CustomerFactory.createWithAddress(
            "Some...", new Address("Rua 7", 45, "4516", "São Paulo"));

        const other = CustomerFactory.createWithAddress(
            "Other...", new Address("Rua 9", 89, "2616", "São Paulo"));

        const repository = new CustomerRepository();
        await repository.create(customer);
        await repository.create(other);
        
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
        const repository = new CustomerRepository();
        const result = await new ListCustomerUseCase(repository).execute({});
        expect(result.customers.length).toBe(0);
        expect(result.customers).toEqual([]);
    });

});