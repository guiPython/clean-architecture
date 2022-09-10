import IValidator from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../validator/product.validator.yup";

export default class ProductValidatorFactory {
    public static create(): IValidator<Product>{
        return new ProductYupValidator();
    }
}