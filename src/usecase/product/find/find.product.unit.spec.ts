import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/product-repository";
import FindProductUseCase from "./find.product";
import { InputFindProduct, OutputFindProduct } from "./find.product.dto";

const Repository = (): IProductRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const product = new Product("111", "Some...", 56);
        const repository = Repository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(product))

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
        const repository = Repository();
        repository.find = jest.fn().mockImplementation(() => {
            throw new Error("Product not found");
        });
        expect(async () => {
           return await new FindProductUseCase(repository).execute({id: "Some Id..."});
        }).rejects.toThrow("Product not found")
    });
});