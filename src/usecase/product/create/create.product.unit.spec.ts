import IProductRepository from "../../../domain/product/repository/product-repository";
import { InputCreateProduct, OutputCreateProduct } from "./create.product.dto";
import CreateProductUseCase from "./create.product";

const Repository = (): IProductRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test create product use case", () => {
    it("should create a new product", async () => {
        const repository = Repository();
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
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProduct = {
            name: "",
            price: 158
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Name is required");                                                                                                                                                                                                          
    })

    it("should throw an error when price is invalid", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProduct = {
            name: "Some...",
            price: -150
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Price must be greater than 0");                                                                                                                                                                                                          
    })
});