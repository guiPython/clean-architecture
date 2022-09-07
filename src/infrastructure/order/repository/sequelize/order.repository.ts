import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import IOrderRepository from "../../../../domain/checkout/repository/order-repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements IOrderRepository{
    async create(entity: Order): Promise<void>{
        await OrderModel.create({
            id: entity.Id,
            customer_id: entity.CustomerId,
            items: entity.Items.map((item) => ({
                id: item.Id,
                name: item.Name,
                price: item.Price,
                product_id: item.ProductId,
                quantity: item.Quantity,
            })),
            total: entity.total()
        }, {
            include: [{model: OrderItemModel}]
        })
    }

    async update(entity: Order): Promise<void>{
        await OrderModel.sequelize.transaction(async (transaction) => {
            await OrderItemModel.destroy({
                where:{
                    order_id: entity.Id
                },
                transaction: transaction,
            });

            const items = entity.Items.map(item => ({
                id: item.Id,
                name: item.Name,
                price: item.Price,
                product_id: item.ProductId,
                quantity: item.Quantity,
                order_id: entity.Id
            }));

            await OrderItemModel.bulkCreate(items, {transaction: transaction})
            await OrderModel.update(
                {
                    total: entity.total()
                }, 
                {
                    where:{
                        id: entity.Id,
                        customer_id: entity.CustomerId
                    },
                    transaction: transaction
                }
            );
        })
    }

    async find(id: string): Promise<Order>{
        let orderModel;
        try{    
            orderModel = await OrderModel.findByPk(id, {include: ["items"]})
        }catch{
            throw new Error("Order not found");
        }

        const items = orderModel.items.map(orderItemModel => new OrderItem(
            orderItemModel.id, 
            orderItemModel.product_id, 
            orderItemModel.name, 
            orderItemModel.price, 
            orderItemModel.quantity
        ));

        return new Order(orderModel.id, orderModel.customer_id, items);
    }

    async findAll(): Promise<Order[]>{
        const orderModels = await OrderModel.findAll({include: ["items"]});
        return orderModels.map(orderModel => {
            const items = orderModel.items.map(orderItemModel => new OrderItem(
                orderItemModel.id, 
                orderItemModel.product_id, 
                orderItemModel.name, 
                orderItemModel.price, 
                orderItemModel.quantity
            ));
            return new Order(orderModel.id, orderModel.customer_id, items);
        })
    }
}