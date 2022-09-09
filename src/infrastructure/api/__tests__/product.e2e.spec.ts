import {app, sequelize} from "../express"
import request from "supertest"

describe("E2E Test for product routes", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Some...",
                price: 150
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Some...");
        expect(response.body.price).toBe(150);
    });

    it("should not create a product because name is invalid", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "",
                price: 452,
            });
        expect(response.statusCode).toBe(500);
    });

    it("should not create a product because price is invalid", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Some...",
                price: -452,
            });
        expect(response.statusCode).toBe(500);
    });

    it("should update a product", async () => {
        let response = await request(app)
            .post("/products")
            .send({
                name: "Some...",
                price: 100,
            });  
        expect(response.statusCode).toBe(201);

        const id = response.body.id;
        response = await request(app)
            .put(`/products/${id}`)
            .send({
                name: "Other",
                price: 452,
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Other");
        expect(response.body.price).toBe(452);
    });

    it("should not update a product because name is invalid", async () => {
        let response = await request(app)
            .post("/products")
            .send({
                name: "Some...",
                price: 100,
            });  
        expect(response.statusCode).toBe(201);

        const id = response.body.id;
        response = await request(app)
            .put(`/products/${id}`)
            .send({
                name: "",
                price: 452,
            });
        expect(response.statusCode).toBe(500);
    });

    it("should not update a product because price is invalid", async () => {
        let response = await request(app)
            .post("/products")
            .send({
                name: "Some...",
                price: 100,
            });
        expect(response.statusCode).toBe(201);

        const id = response.body.id;
        response = await request(app)
            .put(`/products/${id}`)
            .send({
                name: "Some...",
                price: -452,
            });
        expect(response.statusCode).toBe(500);
    });

    it("should find a product", async () => {
        let response = await request(app)
            .post("/products")
            .send({
                name: "Some...",
                price: 150
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Some...");
        expect(response.body.price).toBe(150);

        const id = response.body.id;
        response = await request(app)
            .get(`/products/${id}`)
            .send();

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.name).toBe("Some...");
        expect(response.body.price).toBe(150);
    });

    it("should not find a product", async () => {
        const response = await request(app)
            .get("/products/Some_Id...")
            .send();
        expect(response.statusCode).toBe(404);
    });

    it("should list all products", async () => {
        let response = await request(app)
        .post("/products")
        .send({
            name: "Some...",
            price: 150
        });
        expect(response.statusCode).toBe(201);
        
        response = await request(app)
        .post("/products")
        .send({
            name: "Other...",
            price: 200
        });
        expect(response.statusCode).toBe(201);

        response = await request(app)
            .get("/products")
            .send();

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].name).toBe("Some...");
        expect(response.body.products[0].price).toBe(150);
        expect(response.body.products[1].name).toBe("Other...");
        expect(response.body.products[1].price).toBe(200);
    });
});