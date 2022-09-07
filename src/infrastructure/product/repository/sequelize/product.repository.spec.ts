import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository tests", () => {
    let sequelize: Sequelize;
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => await sequelize.close());

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Some...", 100);

        await productRepository.create(product);
        const productModel = await ProductModel.findByPk(product.Id);
        expect(productModel.toJSON()).toStrictEqual({
            id: product.Id,
            name: product.Name,
            price: product.Price
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Some...", 100);

        await productRepository.create(product);

        product.changeName("Other...");
        product.changePrice(200);

        await productRepository.update(product);
        const productModel = await ProductModel.findByPk(product.Id);
        expect(productModel.toJSON()).toStrictEqual({
            id: product.Id,
            name: "Other...",
            price: 200,
        });
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Some...", 100);
        await productRepository.create(product);

        const result = await productRepository.find(product.Id);
        expect(result).toStrictEqual(product);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Some...", 100);
        const other = new Product("2", "Other...", 200);

        await productRepository.create(product);
        await productRepository.create(other);

        const foundProducts = await productRepository.findAll();
        const products = [product, other];

        expect(products).toEqual(foundProducts);
    });
});