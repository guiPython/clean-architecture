import ICustomerRepository from "../../../domain/customer/repository/customer-repository";
import { InputFindCustomer, OutputFindCustomer } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private readonly _repository: ICustomerRepository;

    constructor(repository: ICustomerRepository) {
        this._repository = repository;
    }

    public async execute(input: InputFindCustomer): Promise<OutputFindCustomer> {
        const customer = await this._repository.find(input.id);
        return {
            id: customer.Id,
            name: customer.Name,
            address: {
                street: customer.Address.Street,
                number: customer.Address.Number,
                city: customer.Address.City,
                zip: customer.Address.Zipcode
            }
        }
    } 

}