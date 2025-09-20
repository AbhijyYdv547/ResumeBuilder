import { describe, expect, it, afterAll, beforeAll, vi } from "vitest";
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

describe("POST /score", () => {
  it("should give a github score", async () => {
    const res = await request(app)
      .post("/api/score/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "testgithub",
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      score: 10,
      advice: "Good job",
    });
  });
});
