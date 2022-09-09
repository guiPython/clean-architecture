import IProductRepository from "../../../domain/product/repository/product-repository";
import { InputFindProduct, OutputFindProduct } from "./find.product.dto";

export default class FindProductUseCase {
    private readonly _repository: IProductRepository;

    constructor(repository: IProductRepository) {
        this._repository = repository;
    }

    public async execute(input: InputFindProduct): Promise<OutputFindProduct> {
        const product = await this._repository.find(input.id);
        return {
            id: product.Id,
            name: product.Name,
            price: product.Price
        }
    } 

}