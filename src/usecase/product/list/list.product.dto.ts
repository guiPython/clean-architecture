export class InputListProductsUseCase {}

type Product = {
    id: string;
    name: string;
    price: number
}

export class OutputListProductsUseCase {
    products: Product[];
}