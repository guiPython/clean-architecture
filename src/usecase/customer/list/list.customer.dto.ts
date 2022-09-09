export class InputListCustomersUseCase {}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        city: string;
        zip: string;
    }
}

export class OutputListCustomersUseCase {
    customers: Customer[];
}