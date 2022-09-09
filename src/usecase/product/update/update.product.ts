import IProductRepository from "../../../domain/product/repository/product-repository";
import { InputUpdateProduct, OutputUpdateProduct } from "./update.product.dto";

export class UpdateProductUseCase {
    private readonly _repository: IProductRepository

    constructor(repository: IProductRepository){
        this._repository = repository;
    }

    public async execute(input: InputUpdateProduct): Promise<OutputUpdateProduct>{
        const product = await this._repository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this._repository.update(product); 
        return {
            id: product.Id,
            name: product.Name,
            price: product.Price
        }
    }
}