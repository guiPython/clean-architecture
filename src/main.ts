import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Address from "./domain/customer/entity/address";
import Customer from "./domain/customer/entity/customer";


let customer = new Customer("123", "Guilherme Rocha");
const address = new Address("Rua 7", 56, "1223-458","São Paulo")
customer.changeAddress(address);
customer.activate();

const someItem = new OrderItem("1", "3", "Some...", 59.56, 2)
const otherItem = new OrderItem("2", "1", "Other...", 102.89, 1)
const order = new Order("1", "123", [someItem, otherItem])