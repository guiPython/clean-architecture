import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";


describe("Customer repository tests", () => {
    let sequelize: Sequelize;
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => await sequelize.close());

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Rafael");
        const address = new Address("Rua 7", 85, "123-456", "São Paulo");
        customer.changeAddress(address);
        
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findByPk(customer.Id);

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.Id,
            name: customer.Name,
            active: false,
            rewards: customer.RewardPoints,
            street: customer.Address.Street,
            number: customer.Address.Number,
            zipcode: customer.Address.Zipcode,
            city: customer.Address.City
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Marcos");
        const address = new Address("Rua 7", 85, "123-456", "São Paulo");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        
        customer.activate();
        customer.changeName("André");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findByPk(customer.Id);
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.Id,
            name: "André",
            active: true,
            rewards: customer.RewardPoints,
            street: address.Street,
            number: address.Number,
            zipcode: address.Zipcode,
            city: address.City
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Rafael");
        const address = new Address("Rua 7", 85, "123-456", "São Paulo");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const foundCustomer = await customerRepository.find(customer.Id);

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("should throw error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => await customerRepository.find("NotExists")).rejects.toThrowError("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Rafael");
        const other = new Customer("2", "Rafael");
        const address = new Address("Rua 7", 85, "123-456", "São Paulo");

        customer.changeAddress(address);
        other.changeAddress(address);
        
        await customerRepository.create(customer);
        await customerRepository.create(other);
        const customers = await customerRepository.findAll();
        expect(customers).toEqual([customer, other]);
    });
});