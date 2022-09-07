import Product from "../../../../domain/product/entity/product";
import IProductRepository from "../../../../domain/product/repository/product-repository";
import ProductModel from "./product.model";

export default class ProductRepository implements IProductRepository {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.Id,
            name: entity.Name,
            price: entity.Price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.Name,
            price: entity.Price
        }, {
            where: {
                id: entity.Id
            },
        });
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findByPk(id);
        return new Product(productModel.id, productModel.name, productModel.price);
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(productModel => new Product(productModel.id, productModel.name, productModel.price));
    }
}