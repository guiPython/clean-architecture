import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import { OutputListCustomersUseCase, InputListCustomersUseCase } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private readonly _repository: ICustomerRepository;

    constructor(repository: ICustomerRepository){
        this._repository = repository;
    }

    public async execute(input: InputListCustomersUseCase): Promise<OutputListCustomersUseCase> {
        const customers_entities= await this._repository.findAll();
        return {
            customers: customers_entities.map(c => {return {
                id: c.Id, 
                name: c.Name, 
                address:{
                    street: c.Address.Street,
                    city: c.Address.City,
                    number: c.Address.Number,
                    zip: c.Address.Zipcode
                }
            }})
        }
    }

}