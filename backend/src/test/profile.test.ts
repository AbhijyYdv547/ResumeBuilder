import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  vi,
  afterAll,
  beforeAll,
} from "vitest";
import request from "supertest";
import { app } from "../app.js";
import mongoose from "mongoose";

let token: string;

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI as string);

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: "testuser@example.com",
    password: "Password@123",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "testuser@example.com",
    password: "Password@123",
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Profile Flow", () => {
  it("should return user profile", async () => {
    const userRes = await request(app)
      .get("/api/profile/")
      .set("Authorization", `Bearer ${token}`);

    expect(userRes.statusCode).toBe(200);
    expect(userRes.body).toMatchObject({
      name: "User",
      email: "testuser@example.com",
    });
  });
});

describe("PUT /update", () => {
  it("should update user profile", async () => {
    const updateRes = await request(app)
      .put("/api/profile/update")
      .send({
        name: "User",
        email: "testuser@example.com",
        password: "Password@123",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toMatchObject({
      name: "User",
      email: "testuser@example.com",
    });
  });
});
