import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

vi.mock("googleapis", () => {
  return {
    google: {
      auth: {
        OAuth2: vi.fn().mockImplementation(() => {
          return {
            getTokenInfo: vi.fn().mockResolvedValue({
              email: "lukk@gmail.com",
            }),
          };
        }),
      },
    },
  };
});

describe("Auth Flow", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DB_URI as string);
    await User.deleteMany({ email: "test@test.com" });
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it("should let people register and login a user", async () => {
    const registerRes = await request(app).post("/api/auth/register").send({
      name: "testify",
      email: "test@test.com",
      password: "Test@123456",
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.message).toBe("User registered successfully!");

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "Test@123456",
    });

    let token = loginRes.body.token;

    expect(loginRes.statusCode).toBe(201);
    expect(loginRes.body).toHaveProperty("token");
  });

  it("should let user to login or register using google", async () => {
    const googleRes = await request(app).post("/api/auth/google").send({
      token: "some_mock_token",
    });

    console.log(googleRes.body);
    expect(googleRes.statusCode).toBe(200);
    expect(googleRes.body).toHaveProperty("token");
    expect(googleRes.body.user.email).toBe("lukk@gmail.com");
  });
});
