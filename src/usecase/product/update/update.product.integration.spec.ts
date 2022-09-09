import { UpdateProductUseCase } from "./update.product"
import { InputUpdateProduct, OutputUpdateProduct } from "./update.product.dto";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";


describe("Unit Test update product use case", () => {
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
    
    it("should update a product", async () => {
        const repository = new ProductRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("111", "Aleatório", 20)
        ))

        const input: InputUpdateProduct = {
            id: "111",
            name: "Some...",
            price: 15
        }

        const output: OutputUpdateProduct = {
            id: "111",
            name: "Some...",
            price: 15
        }

        const result = await new UpdateProductUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });

    it("should throw error when product name is invalid", async () => {
        let input: InputUpdateProduct = {
            id: "111",
            name: "",
            price:150
        }

        const repository = new ProductRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("111", "Aleatório", 20)
        ))
        expect(async () => {await new UpdateProductUseCase(repository).execute(input)}).rejects.toThrow("Name is required");
    });

    it("should throw error when product price is invalid", async () => {
        let input: InputUpdateProduct = {
            id: "111",
            name: "Some...",
            price:-150
        }
        const repository = new ProductRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("111", "Aleatório", 20)
        ))
        expect(async () => {await new UpdateProductUseCase(repository).execute(input)}).rejects.toThrow("Price must be greater than 0");
    });
});