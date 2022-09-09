import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product";
import { InputFindProduct, OutputFindProduct } from "./find.product.dto";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"


describe("Unit Test find product use case", () => {
    let sequelize: Sequelize; 
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const product = new Product("111", "Some...", 56);
        const repository = new ProductRepository();

        await repository.create(product);

        const input: InputFindProduct = {
            id: product.Id
        }

        const output: OutputFindProduct = {
            id: product.Id,
            name: product.Name,
            price: product.Price
        }

        const result = await new FindProductUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });

    it("should throw error when product not found", async () => {
        const repository = new ProductRepository();
        expect(async () => {
           return await new FindProductUseCase(repository).execute({id: "Some Id..."});
        }).rejects.toThrow("Product not found")
    });
});