import Route , {Request, Response} from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product";
import { InputCreateProduct } from "../../../usecase/product/create/create.product.dto";
import FindProductUseCase from "../../../usecase/product/find/find.product";
import { InputFindProduct } from "../../../usecase/product/find/find.product.dto";
import ListProductUseCase from "../../../usecase/product/list/list.product";
import { UpdateProductUseCase } from "../../../usecase/product/update/update.product";
import { InputUpdateProduct } from "../../../usecase/product/update/update.product.dto";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productsRoute = Route();

productsRoute.post("/", async (req: Request, res: Response) => {
 try{
    const input: InputCreateProduct = {
        name: req.body.name,
        price: req.body.price
    }

    const use_case = new CreateProductUseCase(new ProductRepository());
    const output = await use_case.execute(input);
    res.status(201).send(output);
 }catch(err){
    res.status(500).send(err);
 }
});

productsRoute.get("/", async (_: Request, res: Response) => {
    try{
        const use_case = new ListProductUseCase(new ProductRepository());
        const output = await use_case.execute({});
        res.status(200).send(output);
    }catch(err){
        res.status(500).send(err);
    }
});

productsRoute.get("/:id", async (req: Request, res: Response) => {
    try{
        const input: InputFindProduct = {
            id: req.params.id
        }
        const use_case = new FindProductUseCase(new ProductRepository());
        const output = await use_case.execute(input);
        res.status(200).send(output);
    }catch(err){
        res.status(404).send(err);
    }
});

productsRoute.put("/:id", async (req: Request, res: Response) => {
    try{
        const input: InputUpdateProduct = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price
        }
    
        const use_case = new UpdateProductUseCase(new ProductRepository());
        const output = await use_case.execute(input);
        res.status(200).send(output);
     }catch(err){
        res.status(500).send(err);
     }
});