import { describe, expect, it, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URI as string);
  await User.deleteMany({ email: "test@test.com" });
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /register", () => {
  it("should let people register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "testify",
      email: "test@test.com",
      password: "Test@123456",
    });

    console.log("Test response:", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully!");
  });
});
