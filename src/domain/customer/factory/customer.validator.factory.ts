import IValidator from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import { CustomerYupValidator } from "../validator/customer.validator.yup";

export default class CustomerValidatorFactory {
    public static create(): IValidator<Customer>{
        return new CustomerYupValidator();
    }
}