import IProductRepository from "../../../domain/product/repository/product-repository";
import { OutputListProductsUseCase, InputListProductsUseCase } from "./list.product.dto";

export default class ListCustomerUseCase {
    private readonly _repository: IProductRepository;

    constructor(repository: IProductRepository){
        this._repository = repository;
    }

    public async execute(input: InputListProductsUseCase): Promise<OutputListProductsUseCase> {
        const product_entities= await this._repository.findAll();
        return {
            products: product_entities.map(p => {return {
                id: p.Id, 
                name: p.Name, 
                price: p.Price 
            }})
        }
    }

}