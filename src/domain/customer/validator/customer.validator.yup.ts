import IValidator from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup"

export class CustomerYupValidator implements IValidator<Customer>{
    validate(entity: Customer): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required")
                })
                .validateSync({
                    id: entity.Id,
                    name: entity.Name
                }, { abortEarly: false })
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.Notification.addError({
                    context: "customer",
                    message: error
                });
            });
        }
    }

}