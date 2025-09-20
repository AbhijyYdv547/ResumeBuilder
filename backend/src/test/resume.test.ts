import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { resumeData } from "../utils/data.js";

let token: string;
let id: string;

beforeAll(async () => {
  const email = `testuser+${Date.now()}@example.com`;

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: email,
    password: "Password@123",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: email,
    password: "Password@123",
  });

  token = loginRes.body.token;

  const res = await request(app)
    .post("/api/resumes/generate")
    .set("Authorization", `Bearer ${token}`)
    .send(resumeData);

  console.log(res.body);

  id = res.body.id;

  expect(res.status).toBe(200);
  expect(id).toBeDefined();
});

describe("Resume API", () => {
  it("should generate a resume", async () => {
    const genRes = await request(app)
      .post("/api/resumes/generate")
      .set("Authorization", `Bearer ${token}`)
      .send(resumeData);

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
    console.log(specRes);
    expect(specRes.status).toBe(200);
  });

  it("should delete specific resume", async () => {
    const delRes = await request(app)
      .delete(`/api/resumes/${id}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(delRes);
    expect(delRes.status).toBe(200);
    expect(delRes.body.message).toBe("Resume deleted successfully");
  });
});
