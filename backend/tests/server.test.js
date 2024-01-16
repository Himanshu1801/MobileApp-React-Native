const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

process.env.NODE_ENV = "test";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/mobileApp");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /users", () => {
  it("should get all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("length");
  });
});

describe("GET /users/:id", () => {
  it("should get a single user by ID", async () => {
    const newUser = {
      name: "John Doe",
      age: 25,
      emailId: "john@gmail.com",
      password: "123",
    };
    const createdUserResponse = await request(app).post(`/users`).send(newUser);
    const createdUser = createdUserResponse.body;
    const sampleUserId = createdUser._id;
    const response = await request(app).get(`/users/${sampleUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", sampleUserId);

    await request(app).delete(`/users/${sampleUserId}`);
  });
});

describe("POST /users", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "Alice Wonderland",
      age: 30,
      emailId: "alice@gmail.com",
      password: "password123",
    };

    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");

    const createdUserId = response.body._id;

    await request(app).delete(`/users/${createdUserId}`);
  });

  it("should handle missing required fields", async () => {
    const invalidUser = {
      age: 30,
      emailId: "missingfields@gmail.com",
    };

    const response = await request(app).post("/users").send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PUT /users/:id", () => {
  it("should update a user's information", async () => {
    const updatedInfo = {
      name: "Updated Name",
      age: 35,
      emailId: "updatedemail@gmail.com",
    };

    const createdUserResponse = await request(app).post("/users").send({
      name: "UserToUpdate",
      age: 25,
      emailId: "userToUpdate@gmail.com",
      password: "123",
    });

    const userIdToUpdate = createdUserResponse.body._id;

    const response = await request(app)
      .put(`/users/${userIdToUpdate}`)
      .send(updatedInfo);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", userIdToUpdate);

    await request(app).delete(`/users/${userIdToUpdate}`);
  });
});

describe("DELETE /users/:id", () => {
  it("should delete a user", async () => {
    const createdUserResponse = await request(app).post("/users").send({
      name: "UserToDelete",
      age: 28,
      emailId: "userToDelete@gmail.com",
      password: "123",
    });

    const userIdToDelete = createdUserResponse.body._id;

    const response = await request(app).delete(`/users/${userIdToDelete}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
  });
});