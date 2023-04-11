const request = require("supertest");
const { server } = require("./server");

describe("Testing authRouter endpoints", () => {
  test("POST /register should return 201 if req.body is good", async () => {
    const respons = await request(server)
      .post("/register")
      .send({ username: "Soffi", password: "hemligt" });

    expect(respons.status).toBe(201);
  });

  test("POST /register should return 400 if req.body is unfulfilled", async () => {
    const respons = await request(server).post("/register").send({});

    expect(respons.status).toBe(400);
  });

  test("POST /login should return 200 if req.body is good", async () => {
    const respons = await request(server)
      .post("/login")
      .send({ username: "Skantz", password: "hemligt" });

    expect(respons.status).toBe(200);
  });

  test("POST /login should return 400 if req.body is unfulfilled", async () => {
    const respons = await request(server).post("/login").send({});

    expect(respons.status).toBe(400);
  });
});
