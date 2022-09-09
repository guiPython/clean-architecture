import { InputCreateProduct, OutputCreateProduct } from "./create.product.dto";
import CreateProductUseCase from "./create.product";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"

describe("Unit Test create product use case", () => {
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

    it("should create a new product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProduct = {
            name: "Some...",
            price: 150
        }

        const output: OutputCreateProduct = await usecase.execute(input)                                                                                                                                                                                                           
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProduct = {
            name: "",
            price: 158
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Name is required");                                                                                                                                                                                                          
    })

    it("should throw an error when price is invalid", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProduct = {
            name: "Some...",
            price: -150
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Price must be greater than 0");                                                                                                                                                                                                          
    })
});