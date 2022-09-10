import IValidator from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup"

export default class ProductYupValidator implements IValidator<Product> {
    validate(entity: Product): void {
        try{
            yup
            .object()
            .shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().positive().moreThan(0, "Price must be greater than 0")
            }).validateSync({
                id: entity.Id,
                name: entity.Name,
                price: entity.Price
            },{
               abortEarly: false 
            })
        }catch(errors){
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.Notification.addError({
                    context:"product",
                    message: error
                })
            });
        }
    }

}