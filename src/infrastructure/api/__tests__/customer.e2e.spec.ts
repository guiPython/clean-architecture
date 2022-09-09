import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E Test for customer routes", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Alex",
                address: {
                    street: "Rua 7",
                    city: "São Paulo",
                    number: 52,
                    zip: "123156"
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Alex");
        expect(response.body.address.city).toBe("São Paulo");
        expect(response.body.address.street).toBe("Rua 7");
        expect(response.body.address.number).toBe(52);
        expect(response.body.address.zip).toBe("123156");
    });

    it("should not create a customer because name is invalid", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "",
                address: {
                    street: "Rua 7",
                    city: "São Paulo",
                    number: 52,
                    zip: "123156"
                }
            });
        expect(response.statusCode).toBe(500);
    });

    it("should update a customer", async () => {
        let response = await request(app)
            .post("/customers")
            .send({
                name: "Alex",
                address: {
                    street: "Rua 7",
                    city: "São Paulo",
                    number: 52,
                    zip: "123156"
                }
            });
        expect(response.statusCode).toBe(201);

        const id = response.body.id;
        response = await request(app)
            .put(`/customers/${id}`)
            .send({
                name: "Lucas",
                address: {
                    street: "Rua 10",
                    city: "Rio de Janeiro",
                    number: 40,
                    zip: "5689"
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Lucas");
        expect(response.body.address.city).toBe("Rio de Janeiro");
        expect(response.body.address.street).toBe("Rua 10");
        expect(response.body.address.number).toBe(40);
        expect(response.body.address.zip).toBe("5689");
    });

    it("should not update a customer because name is invalid", async () => {
        let response = await request(app)
            .post("/customers")
            .send({
                name: "Alex",
                address: {
                    street: "Rua 7",
                    city: "São Paulo",
                    number: 52,
                    zip: "123156"
                }
            });
        expect(response.statusCode).toBe(201);

        const id = response.body.id;
        response = await request(app)
            .put(`/customers/${id}`)
            .send({
                name: "",
                address: {
                    street: "",
                    city: "Rio de Janeiro",
                    number: 40,
                    zip: "5689"
                }
            });
        expect(response.statusCode).toBe(500);
    });

    it("should find a customer", async () => {
        let response = await request(app)
            .post("/customers")
            .send({
                name: "Lucas",
                address: {
                    street: "Rua 10",
                    city: "Rio de Janeiro",
                    number: 40,
                    zip: "5689"
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Lucas");
        expect(response.body.address.city).toBe("Rio de Janeiro");
        expect(response.body.address.street).toBe("Rua 10");
        expect(response.body.address.number).toBe(40);
        expect(response.body.address.zip).toBe("5689");

        const id = response.body.id;
        response = await request(app)
            .get(`/customers/${id}`)
            .send();

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.name).toBe("Lucas");
        expect(response.body.address.city).toBe("Rio de Janeiro");
        expect(response.body.address.street).toBe("Rua 10");
        expect(response.body.address.number).toBe(40);
        expect(response.body.address.zip).toBe("5689");
    });

    it("should not find a customer", async () => {
        const response = await request(app)
            .get("/customers/Some_Id...")
            .send();
        expect(response.statusCode).toBe(404);
    });

    it("should list all customers", async () => {
        let response = await request(app)
            .post("/customers")
            .send({
                name: "Alex",
                address: {
                    street: "Rua 7",
                    city: "São Paulo",
                    number: 52,
                    zip: "123156"
                }
            });
        expect(response.statusCode).toBe(201);

        response = await request(app)
            .post("/customers")
            .send({
                name: "João",
                address: {
                    street: "Rua 10",
                    city: "Rio de Janeiro",
                    number: 12,
                    zip: "129156"
                }
            });
        expect(response.statusCode).toBe(201);

        response = await request(app)
            .get("/customers")
            .send();

        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);
        expect(response.body.customers[0].name).toBe("Alex");
        expect(response.body.customers[1].name).toBe("João");
    });
});