import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import { InputUpdateCustomer, OutputUpdateCustomer } from "./update.customer.dto";

export class UpdateCustomerUseCase {
    private readonly _repository: ICustomerRepository

    constructor(repository: ICustomerRepository){
        this._repository = repository;
    }

    public async execute(input: InputUpdateCustomer): Promise<OutputUpdateCustomer>{
        const customer = new Customer(input.id, input.name);
        const address = new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        );
        customer.changeAddress(address)
        await this._repository.update(customer); 
        return {
            id:customer.Id,
            name:customer.Name,
            address:{
                street:customer.Address.Street,
                city:customer.Address.City,
                number:customer.Address.Number,
                zip:customer.Address.Zipcode
            }
        }
    }
}