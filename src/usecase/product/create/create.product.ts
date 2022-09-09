import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import IProductRepository from "../../../domain/product/repository/product-repository";
import { InputCreateProduct, OutputCreateProduct } from "./create.product.dto";
import {v4 as uuid} from "uuid";

export default class CreateProductUseCase {
    private readonly _repository: IProductRepository;
    constructor(repository: IProductRepository) {
        this._repository = repository;
    }

    public async execute(input: InputCreateProduct): Promise<OutputCreateProduct> {
        let product = new Product(uuid(), input.name, input.price);
        await this._repository.create(product);
        return {
            id: product.Id,
            name: product.Name,
            price: product.Price
        }
    }
}