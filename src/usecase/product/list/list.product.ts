import IProductRepository from "../../../domain/product/repository/product-repository";
import { OutputListProducts, InputListProducts } from "./list.product.dto";

export default class ListProductUseCase {
    private readonly _repository: IProductRepository;

    constructor(repository: IProductRepository){
        this._repository = repository;
    }

    public async execute(input: InputListProducts): Promise<OutputListProducts> {
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