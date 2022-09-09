import express, { Response, Request } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer";
import { InputCreateCustomer } from "../../../usecase/customer/create/create.customer.dto";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer";
import { InputFindCustomer } from "../../../usecase/customer/find/find.customer.dto";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer";
import { UpdateCustomerUseCase } from "../../../usecase/customer/update/update.customer";
import { InputUpdateCustomer } from "../../../usecase/customer/update/update.customer.dto";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const use_case = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const input: InputCreateCustomer = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            }
        }
        const output = await use_case.execute(input);
        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get("/", async (_: Request, res: Response) => {
    try {
        const use_case = new ListCustomerUseCase(new CustomerRepository());
        const output = await use_case.execute({});
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get("/:id", async (req: Request, res: Response) => {
    try{
        const input: InputFindCustomer = {
            id: req.params.id
        }
        const use_case = new FindCustomerUseCase(new CustomerRepository());
        const output = await use_case.execute(input);
        res.status(200).send(output);
    }catch(err){
        res.status(404).send(err);
    }
});

customerRoute.put("/:id", async (req: Request, res: Response) => {
    try{
        const input: InputUpdateCustomer = {
            id: req.params.id,
            name: req.body.name,
            address:{
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            }
        }
    
        const use_case = new UpdateCustomerUseCase(new CustomerRepository());
        const output = await use_case.execute(input);
        res.status(200).send(output);
     }catch(err){
        res.status(500).send(err);
     }
});