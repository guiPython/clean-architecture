import Product from "../entity/product";

export default class ProductService {
    public static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => product.changePrice(
            product.Price * (1 + percentage/100)
        ))
    }
}