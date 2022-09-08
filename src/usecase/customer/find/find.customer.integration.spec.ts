import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer";
import { InputFindCustomer, OutputFindCustomer } from "./find.customer.dto";

describe("Test find customer use case", () => {
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

    it("should find a customer", async () => {
        const customer = new Customer("111", "Rafael");
        const address = new Address("Rua 7", 56, "85-8956","São Paulo");
        customer.changeAddress(address);

        const repository = new CustomerRepository();
        await repository.create(customer);

        const input: InputFindCustomer = {
            id: customer.Id
        }

        const output : OutputFindCustomer = {
            id: customer.Id,
            name: customer.Name,
            address:{
                street: customer.Address.Street,
                number: customer.Address.Number,
                city: customer.Address.City,
                zip: customer.Address.Zipcode
            }
        }

        const result = await new FindCustomerUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    })
});