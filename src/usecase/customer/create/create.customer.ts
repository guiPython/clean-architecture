import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import { InputCreateCustomer, OutputCreateCustomer } from "./create.customer.dto";

export default class CreateCustomerUseCase {
    private readonly _repository: ICustomerRepository;
    constructor(repository: ICustomerRepository) {
        this._repository = repository;
    }

    public async execute(input: InputCreateCustomer): Promise<OutputCreateCustomer> {
        let customer;
        if (input.address) {
            const address = new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city);
            customer = CustomerFactory.createWithAddress(input.name, address)
        } else {
            customer = CustomerFactory.create(input.name);
        }

        await this._repository.create(customer);

        return {
            id: customer.Id,
            name: customer.Name,
            address: {
                street: customer.Address.Street,
                city: customer.Address.City,
                number: customer.Address.Number,
                zip: customer.Address.Zipcode
            }
        }
    }
}