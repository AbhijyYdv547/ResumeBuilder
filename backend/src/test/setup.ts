import { afterAll, beforeAll, beforeEach } from "vitest";
import { clearDatabase, closeDatabase, connect } from "./database";

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});
