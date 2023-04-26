const request = require("supertest");
const { server } = require("./server");
const main = require("../src/databas")


describe("Testing authRouter endpoints", () => {
  test("POST /auth/register should return 201 if req.body is good", async () => {
    const respons = await request(server)
      .post("/auth/register")
      .send({ "username": "Soffi", "password": "hemligt" });

    expect(respons.status).toBe(201);
  });

  test("POST /auth/register should return 400 if req.body is unfulfilled", async () => {
    const respons = await request(server)
      .post("/auth/register")
      .send({});

    expect(respons.status).toBe(400);
  });

  test("POST /auth/login should return 200 if req.body is good", async () => {
    const respons = await request(server)
      .post("/auth/login")
      .send({ "username": "Soffi", "password": "hemligt" });

    expect(respons.status).toBe(200);
  });

  test("POST /auth/login should return 400 if req.body is unfulfilled", async () => {
    const respons = await request(server)
      .post("/auth/login")
      .send({});

    expect(respons.status).toBe(401);
  });
});

afterAll(async () => {
  const { usersCollection } = await main()
  await usersCollection.deleteOne({username: "Soffi"})
})
