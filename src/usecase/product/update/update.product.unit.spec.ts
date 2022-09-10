import { UpdateProductUseCase } from "./update.product"
import IProductRepository from "../../../domain/product/repository/product-repository";
import { InputUpdateProduct, OutputUpdateProduct } from "./update.product.dto";
import Product from "../../../domain/product/entity/product";


const Repository = (): IProductRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        const repository = Repository();
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

        const repository = Repository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("111", "Aleatório", 20)
        ))
        expect(async () => {
            await new UpdateProductUseCase(repository).execute(input)
        }).rejects.toThrow("product: Name is required");
    });

    it("should throw error when product price is invalid", async () => {
        let input: InputUpdateProduct = {
            id: "111",
            name: "Some...",
            price:-150
        }
        const repository = Repository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("111", "Aleatório", 20)
        ))
        expect(async () => {
            await new UpdateProductUseCase(repository).execute(input)
        }).rejects.toThrow("product: Price must be greater than 0");
    });
});