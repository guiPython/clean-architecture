export class InputListProducts {}

type Product = {
    id: string;
    name: string;
    price: number
}

export class OutputListProducts {
    products: Product[];
}