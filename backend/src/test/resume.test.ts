import { describe, expect, it, afterAll, beforeAll, vi } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import mongoose from "mongoose";
import { resumeData } from "../utils/data.js";

let token: string;

let id: string;

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

describe("POST /generate", () => {
  it("should generate a resume", async () => {
    const genRes = await request(app)
      .post("/api/resumes/generate")
      .set("Authorization", `Bearer ${token}`)
      .send(resumeData);

    id = genRes.body.id;

    expect(genRes.status).toBe(200);
  });

  it("should get all resumes", async () => {
    const getRes = await request(app)
      .get("/api/resumes/")
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(200);
  });

  it("should get specific resume", async () => {
    const specRes = await request(app)
      .get(`/api/resumes/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(specRes.status).toBe(200);
  });

  it("should delete specific resume", async () => {
    const delRes = await request(app)
      .delete(`/api/resumes/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(delRes.status).toBe(200);
    expect(delRes.body.message).toBe("Resume deleted successfully");
  });
});
